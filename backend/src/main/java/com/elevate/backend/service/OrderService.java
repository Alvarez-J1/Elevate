package com.elevate.backend.service;

import com.elevate.backend.dto.common.PageResponse;
import com.elevate.backend.dto.order.CheckoutItemRequest;
import com.elevate.backend.dto.order.CheckoutRequest;
import com.elevate.backend.dto.order.OrderResponse;
import com.elevate.backend.entity.Address;
import com.elevate.backend.entity.Cart;
import com.elevate.backend.entity.CartItem;
import com.elevate.backend.entity.Order;
import com.elevate.backend.entity.OrderItem;
import com.elevate.backend.entity.OrderStatus;
import com.elevate.backend.entity.Product;
import com.elevate.backend.entity.User;
import com.elevate.backend.exception.BadRequestException;
import com.elevate.backend.exception.InsufficientStockException;
import com.elevate.backend.exception.ResourceNotFoundException;
import com.elevate.backend.mapper.OrderMapper;
import com.elevate.backend.repository.CartRepository;
import com.elevate.backend.repository.OrderRepository;
import com.elevate.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.security.SecureRandom;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private static final BigDecimal FREE_SHIPPING_THRESHOLD = new BigDecimal("500");
    private static final BigDecimal FLAT_SHIPPING_COST = new BigDecimal("24");
    private static final BigDecimal TAX_RATE = new BigDecimal("0.0825");
    private static final SecureRandom RANDOM = new SecureRandom();

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductService productService;
    private final CartRepository cartRepository;
    private final OrderMapper orderMapper;

    @Transactional
    public OrderResponse checkout(Long userId, CheckoutRequest request) {
        User user = userId != null ? userRepository.findById(userId)
                .orElseThrow(() -> ResourceNotFoundException.of("User", userId)) : null;
        Cart authenticatedCart = user != null ? findCheckoutCart(userId) : null;
        List<CheckoutLine> checkoutLines = user != null
                ? linesFromCart(authenticatedCart)
                : linesFromGuestRequest(request.items());

        String contactEmail = request.contactEmail();
        if (contactEmail == null || contactEmail.isBlank()) {
            if (user == null) {
                throw new BadRequestException("A contact email is required for guest checkout");
            }
            contactEmail = user.getEmail();
        }

        Address shippingAddress = new Address(
                request.shippingAddress().firstName(),
                request.shippingAddress().lastName(),
                request.shippingAddress().addressLine1(),
                request.shippingAddress().city(),
                request.shippingAddress().postalCode(),
                request.shippingAddress().country());

        Order order = Order.builder()
                .orderNumber(generateOrderNumber())
                .user(user)
                .contactEmail(contactEmail)
                .status(OrderStatus.PAID)
                .shippingAddress(shippingAddress)
                .build();

        BigDecimal subtotal = BigDecimal.ZERO;

        for (CheckoutLine line : checkoutLines) {
            Product product = line.product();

            if (line.quantity() > product.getStock()) {
                throw new InsufficientStockException(
                        "Only " + product.getStock() + " unit(s) of '" + product.getName() + "' are available");
            }

            String primaryImage = product.getImages().isEmpty() ? null : product.getImages().get(0);

            OrderItem item = OrderItem.builder()
                    .product(product)
                    .productName(product.getName())
                    .productImage(primaryImage)
                    .unitPrice(product.getPrice())
                    .quantity(line.quantity())
                    .color(line.color())
                    .build();

            order.addItem(item);
            subtotal = subtotal.add(product.getPrice().multiply(BigDecimal.valueOf(line.quantity())));

            product.setStock(product.getStock() - line.quantity());
        }

        BigDecimal shippingCost = subtotal.compareTo(BigDecimal.ZERO) == 0
                || subtotal.compareTo(FREE_SHIPPING_THRESHOLD) >= 0
                ? BigDecimal.ZERO
                : FLAT_SHIPPING_COST;
        BigDecimal tax = subtotal.multiply(TAX_RATE).setScale(2, RoundingMode.HALF_UP);
        BigDecimal total = subtotal.add(shippingCost).add(tax);

        order.setSubtotal(subtotal.setScale(2, RoundingMode.HALF_UP));
        order.setShippingCost(shippingCost.setScale(2, RoundingMode.HALF_UP));
        order.setTax(tax);
        order.setTotal(total.setScale(2, RoundingMode.HALF_UP));

        Order saved = orderRepository.save(order);
        if (authenticatedCart != null) {
            authenticatedCart.getItems().clear();
        }
        return orderMapper.toResponse(saved);
    }

    @Transactional(readOnly = true)
    public OrderResponse findByOrderNumberForUser(Long userId, String orderNumber) {
        return orderMapper.toResponse(orderRepository.findByOrderNumberAndUser_Id(orderNumber, userId)
                .orElseThrow(() -> ResourceNotFoundException.of("Order", orderNumber)));
    }

    @Transactional(readOnly = true)
    public OrderResponse findByIdForUser(Long userId, Long orderId) {
        Order order = orderRepository.findByIdAndUser_Id(orderId, userId)
                .orElseThrow(() -> ResourceNotFoundException.of("Order", orderId));
        return orderMapper.toResponse(order);
    }

    @Transactional(readOnly = true)
    public PageResponse<OrderResponse> findMyOrders(Long userId, Pageable pageable) {
        Page<Order> page = orderRepository.findByUser_IdOrderByCreatedAtDesc(userId, pageable);
        return PageResponse.from(page.map(orderMapper::toResponse));
    }

    private String generateOrderNumber() {
        String candidate;
        do {
            int suffix = 100000 + RANDOM.nextInt(900000);
            candidate = "ELEVATE-" + suffix;
        } while (orderRepository.existsByOrderNumber(candidate));
        return candidate;
    }

    private Cart findCheckoutCart(Long userId) {
        Cart cart = cartRepository.findByUser_Id(userId).orElse(null);
        if (cart == null || cart.getItems().isEmpty()) {
            throw new BadRequestException("Cart is empty");
        }
        return cart;
    }

    private List<CheckoutLine> linesFromCart(Cart cart) {
        return cart.getItems().stream()
                .map(this::lineFromCartItem)
                .toList();
    }

    private CheckoutLine lineFromCartItem(CartItem item) {
        validateQuantity(item.getQuantity());
        Product product = productService.getProductEntityByIdForUpdate(item.getProduct().getId());
        return new CheckoutLine(product, item.getQuantity(), normalizeColor(item.getColor()));
    }

    private List<CheckoutLine> linesFromGuestRequest(List<CheckoutItemRequest> items) {
        if (items == null || items.isEmpty()) {
            throw new BadRequestException("At least one item is required to check out");
        }

        return items.stream()
                .map(this::lineFromGuestItem)
                .toList();
    }

    private CheckoutLine lineFromGuestItem(CheckoutItemRequest item) {
        if (item == null) {
            throw new BadRequestException("Cart item is required");
        }
        validateQuantity(item.quantity());
        Product product = productService.getProductEntityByIdForUpdate(item.productId());
        return new CheckoutLine(product, item.quantity(), normalizeColor(item.color()));
    }

    private void validateQuantity(int quantity) {
        if (quantity < 1) {
            throw new BadRequestException("Quantity must be at least 1");
        }
        if (quantity > 99) {
            throw new BadRequestException("Quantity cannot exceed 99");
        }
    }

    private String normalizeColor(String color) {
        if (color == null || color.isBlank()) {
            return null;
        }
        return color.trim();
    }

    private record CheckoutLine(Product product, int quantity, String color) {
    }
}
