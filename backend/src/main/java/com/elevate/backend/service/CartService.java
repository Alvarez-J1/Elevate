package com.elevate.backend.service;

import com.elevate.backend.dto.cart.AddCartItemRequest;
import com.elevate.backend.dto.cart.CartResponse;
import com.elevate.backend.entity.Cart;
import com.elevate.backend.entity.CartItem;
import com.elevate.backend.entity.Product;
import com.elevate.backend.entity.User;
import com.elevate.backend.exception.BadRequestException;
import com.elevate.backend.exception.InsufficientStockException;
import com.elevate.backend.exception.ResourceNotFoundException;
import com.elevate.backend.mapper.CartMapper;
import com.elevate.backend.repository.CartItemRepository;
import com.elevate.backend.repository.CartRepository;
import com.elevate.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductService productService;
    private final CartMapper cartMapper;

    @Transactional
    public CartResponse getCart(Long userId) {
        return cartMapper.toResponse(getOrCreateCart(userId));
    }

    @Transactional
    public CartResponse addItem(Long userId, AddCartItemRequest request) {
        Cart cart = getOrCreateCart(userId);
        Product product = productService.getProductEntityById(request.productId());
        String color = normalizeColorForStorage(request.color());

        CartItem existing = cartItemRepository
                .findByCart_IdAndProduct_IdAndColor(cart.getId(), product.getId(), color)
                .orElse(null);

        int desiredQuantity = request.quantity() + (existing != null ? existing.getQuantity() : 0);
        if (desiredQuantity > 99) {
            throw new BadRequestException("Quantity cannot exceed 99");
        }
        if (desiredQuantity > product.getStock()) {
            throw new InsufficientStockException(
                    "Only " + product.getStock() + " unit(s) of '" + product.getName() + "' are available");
        }

        if (existing != null) {
            existing.setQuantity(desiredQuantity);
        } else {
            CartItem item = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.quantity())
                    .color(color)
                    .build();
            // Save explicitly (rather than relying solely on the cascade from
            // Cart.items) so the IDENTITY-generated id is populated immediately;
            // otherwise it would stay null until the transaction's implicit
            // flush, and the response DTO built below needs a real item id.
            CartItem saved = cartItemRepository.save(item);
            cart.addItem(saved);
        }

        return cartMapper.toResponse(cart);
    }

    @Transactional
    public CartResponse updateItemQuantity(Long userId, Long itemId, int quantity) {
        Cart cart = getOrCreateCart(userId);
        CartItem item = cartItemRepository.findByIdAndCart_Id(itemId, cart.getId())
                .orElseThrow(() -> ResourceNotFoundException.of("Cart item", itemId));

        if (quantity > item.getProduct().getStock()) {
            throw new InsufficientStockException(
                    "Only " + item.getProduct().getStock() + " unit(s) of '" + item.getProduct().getName() + "' are available");
        }

        item.setQuantity(quantity);
        return cartMapper.toResponse(cart);
    }

    @Transactional
    public CartResponse removeItem(Long userId, Long itemId) {
        Cart cart = getOrCreateCart(userId);
        CartItem item = cartItemRepository.findByIdAndCart_Id(itemId, cart.getId())
                .orElseThrow(() -> ResourceNotFoundException.of("Cart item", itemId));

        cart.removeItem(item);
        return cartMapper.toResponse(cart);
    }

    @Transactional
    public CartResponse clearCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        cart.getItems().clear();
        return cartMapper.toResponse(cart);
    }

    private Cart getOrCreateCart(Long userId) {
        return cartRepository.findByUser_Id(userId).orElseGet(() -> {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> ResourceNotFoundException.of("User", userId));
            return cartRepository.save(Cart.builder().user(user).build());
        });
    }

    private String normalizeColorForStorage(String color) {
        if (color == null || color.isBlank()) {
            return "";
        }
        return color.trim();
    }
}
