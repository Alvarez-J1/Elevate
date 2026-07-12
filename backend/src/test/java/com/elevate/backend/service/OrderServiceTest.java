package com.elevate.backend.service;

import com.elevate.backend.dto.order.CheckoutItemRequest;
import com.elevate.backend.dto.order.CheckoutRequest;
import com.elevate.backend.dto.order.OrderResponse;
import com.elevate.backend.dto.order.ShippingAddressDto;
import com.elevate.backend.entity.Cart;
import com.elevate.backend.entity.CartItem;
import com.elevate.backend.entity.Order;
import com.elevate.backend.entity.Product;
import com.elevate.backend.entity.User;
import com.elevate.backend.exception.BadRequestException;
import com.elevate.backend.exception.InsufficientStockException;
import com.elevate.backend.exception.ResourceNotFoundException;
import com.elevate.backend.mapper.OrderMapper;
import com.elevate.backend.repository.CartRepository;
import com.elevate.backend.repository.OrderRepository;
import com.elevate.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private ProductService productService;
    @Mock
    private CartRepository cartRepository;

    private final OrderMapper orderMapper = new OrderMapper();

    private OrderService orderService() {
        return new OrderService(orderRepository, userRepository, productService, cartRepository, orderMapper);
    }

    private Product product(long id, String price, int stock) {
        return Product.builder()
                .id(id)
                .sku("SKU-" + id)
                .slug("product-" + id)
                .name("Widget " + id)
                .tagline("A fine widget")
                .price(new BigDecimal(price))
                .accent("#fff")
                .stock(stock)
                .images(new java.util.ArrayList<>(List.of("/img-" + id + ".png")))
                .build();
    }

    private User user(long id) {
        return User.builder()
                .id(id)
                .email("customer@example.com")
                .firstName("Customer")
                .lastName("Example")
                .passwordHash("hash")
                .build();
    }

    private Cart cart(long id, User user, CartItem... items) {
        Cart cart = Cart.builder()
                .id(id)
                .user(user)
                .items(new ArrayList<>())
                .build();
        for (CartItem item : items) {
            cart.addItem(item);
        }
        return cart;
    }

    private CartItem cartItem(long id, Product product, int quantity, String color) {
        return CartItem.builder()
                .id(id)
                .product(product)
                .quantity(quantity)
                .color(color)
                .build();
    }

    private ShippingAddressDto address() {
        return new ShippingAddressDto("Jane", "Doe", "123 Main St", "Austin", "78701", "USA");
    }

    private Order order(long id, User user) {
        return Order.builder()
                .id(id)
                .orderNumber("ELEVATE-123456")
                .user(user)
                .contactEmail(user.getEmail())
                .status(com.elevate.backend.entity.OrderStatus.PAID)
                .shippingAddress(new com.elevate.backend.entity.Address(
                        "Jane", "Doe", "123 Main St", "Austin", "78701", "USA"))
                .subtotal(new BigDecimal("100.00"))
                .shippingCost(new BigDecimal("24.00"))
                .tax(new BigDecimal("8.25"))
                .total(new BigDecimal("132.25"))
                .items(new ArrayList<>())
                .build();
    }

    @Test
    void checkout_guestWithoutEmail_throwsBadRequest() {
        CheckoutRequest request = new CheckoutRequest(
                null, address(), List.of(new CheckoutItemRequest(1L, 1, null)));

        assertThrows(BadRequestException.class, () -> orderService().checkout(null, request));
    }

    @Test
    void checkout_guestWithoutItems_throwsBadRequest() {
        CheckoutRequest request = new CheckoutRequest("guest@example.com", address(), List.of());

        assertThrows(BadRequestException.class, () -> orderService().checkout(null, request));
    }

    @Test
    void checkout_insufficientStock_throws() {
        given(productService.getProductEntityByIdForUpdate(1L)).willReturn(product(1L, "100.00", 1));

        CheckoutRequest request = new CheckoutRequest(
                "guest@example.com", address(), List.of(new CheckoutItemRequest(1L, 5, null)));

        assertThrows(InsufficientStockException.class, () -> orderService().checkout(null, request));
    }

    @Test
    void checkout_calculatesTotalsWithFlatShippingBelowThreshold() {
        given(productService.getProductEntityByIdForUpdate(1L)).willReturn(product(1L, "100.00", 10));
        given(orderRepository.existsByOrderNumber(any())).willReturn(false);
        given(orderRepository.save(any(Order.class))).willAnswer(invocation -> invocation.getArgument(0));

        CheckoutRequest request = new CheckoutRequest(
                "guest@example.com", address(), List.of(new CheckoutItemRequest(1L, 2, null)));

        OrderResponse response = orderService().checkout(null, request);

        assertThat(response.subtotal()).isEqualByComparingTo("200.00");
        assertThat(response.shippingCost()).isEqualByComparingTo("24.00");
        assertThat(response.tax()).isEqualByComparingTo("16.50");
        assertThat(response.total()).isEqualByComparingTo("240.50");
        assertThat(response.contactEmail()).isEqualTo("guest@example.com");
        assertThat(response.orderNumber()).startsWith("ELEVATE-");
    }

    @Test
    void checkout_freeShippingAtOrAboveThreshold() {
        given(productService.getProductEntityByIdForUpdate(1L)).willReturn(product(1L, "600.00", 10));
        given(orderRepository.existsByOrderNumber(any())).willReturn(false);
        given(orderRepository.save(any(Order.class))).willAnswer(invocation -> invocation.getArgument(0));

        CheckoutRequest request = new CheckoutRequest(
                "guest@example.com", address(), List.of(new CheckoutItemRequest(1L, 1, null)));

        OrderResponse response = orderService().checkout(null, request);

        assertThat(response.shippingCost()).isEqualByComparingTo("0.00");
    }

    @Test
    void checkout_authenticatedUserUsesServerCartAndClearsItAfterSave() {
        User user = user(5L);
        Product serverProduct = product(2L, "120.00", 5);
        Cart cart = cart(9L, user, cartItem(11L, serverProduct, 2, "Walnut"));

        given(userRepository.findById(5L)).willReturn(Optional.of(user));
        given(cartRepository.findByUser_Id(5L)).willReturn(Optional.of(cart));
        given(productService.getProductEntityByIdForUpdate(2L)).willReturn(serverProduct);
        given(orderRepository.existsByOrderNumber(any())).willReturn(false);
        given(orderRepository.save(any(Order.class))).willAnswer(invocation -> invocation.getArgument(0));

        CheckoutRequest request = new CheckoutRequest(
                null, address(), List.of(new CheckoutItemRequest(1L, 1, "Graphite")));

        OrderResponse response = orderService().checkout(5L, request);

        assertThat(response.contactEmail()).isEqualTo("customer@example.com");
        assertThat(response.items()).singleElement().satisfies(item -> {
            assertThat(item.productId()).isEqualTo(2L);
            assertThat(item.productName()).isEqualTo("Widget 2");
            assertThat(item.unitPrice()).isEqualByComparingTo("120.00");
            assertThat(item.quantity()).isEqualTo(2);
            assertThat(item.color()).isEqualTo("Walnut");
            assertThat(item.productImage()).isEqualTo("/img-2.png");
        });
        assertThat(response.subtotal()).isEqualByComparingTo("240.00");
        assertThat(serverProduct.getStock()).isEqualTo(3);
        assertThat(cart.getItems()).isEmpty();
    }

    @Test
    void checkout_authenticatedFailurePreservesServerCart() {
        User user = user(5L);
        Product serverProduct = product(2L, "120.00", 1);
        Cart cart = cart(9L, user, cartItem(11L, serverProduct, 2, "Walnut"));

        given(userRepository.findById(5L)).willReturn(Optional.of(user));
        given(cartRepository.findByUser_Id(5L)).willReturn(Optional.of(cart));
        given(productService.getProductEntityByIdForUpdate(2L)).willReturn(serverProduct);

        CheckoutRequest request = new CheckoutRequest(null, address(), List.of());

        assertThrows(InsufficientStockException.class, () -> orderService().checkout(5L, request));
        assertThat(cart.getItems()).hasSize(1);
        assertThat(serverProduct.getStock()).isEqualTo(1);
    }

    @Test
    void checkout_authenticatedEmptyCart_throwsBadRequest() {
        User user = user(5L);
        Cart cart = cart(9L, user);

        given(userRepository.findById(5L)).willReturn(Optional.of(user));
        given(cartRepository.findByUser_Id(5L)).willReturn(Optional.of(cart));

        CheckoutRequest request = new CheckoutRequest(null, address(), List.of());

        assertThrows(BadRequestException.class, () -> orderService().checkout(5L, request));
    }

    @Test
    void findByOrderNumberForUser_returnsOnlyMatchingUsersOrder() {
        User user = user(5L);
        Order order = order(22L, user);

        given(orderRepository.findByOrderNumberAndUser_Id("ELEVATE-123456", 5L))
                .willReturn(Optional.of(order));

        OrderResponse response = orderService().findByOrderNumberForUser(5L, "ELEVATE-123456");

        assertThat(response.id()).isEqualTo(22L);
        assertThat(response.orderNumber()).isEqualTo("ELEVATE-123456");
    }

    @Test
    void findByOrderNumberForUser_throwsWhenOrderBelongsToAnotherUser() {
        given(orderRepository.findByOrderNumberAndUser_Id("ELEVATE-123456", 99L))
                .willReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> orderService().findByOrderNumberForUser(99L, "ELEVATE-123456"));
    }
}
