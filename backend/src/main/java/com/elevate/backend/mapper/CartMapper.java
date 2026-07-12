package com.elevate.backend.mapper;

import com.elevate.backend.dto.cart.CartItemResponse;
import com.elevate.backend.dto.cart.CartResponse;
import com.elevate.backend.entity.Cart;
import com.elevate.backend.entity.CartItem;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class CartMapper {

    public CartResponse toResponse(Cart cart) {
        var items = cart.getItems().stream().map(this::toItemResponse).toList();
        BigDecimal subtotal = items.stream()
                .map(CartItemResponse::lineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        int itemCount = items.stream().mapToInt(CartItemResponse::quantity).sum();

        return new CartResponse(cart.getId(), items, itemCount, subtotal);
    }

    public CartItemResponse toItemResponse(CartItem item) {
        var product = item.getProduct();
        String primaryImage = product.getImages().isEmpty() ? null : product.getImages().get(0);
        BigDecimal lineTotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));

        return new CartItemResponse(
                item.getId(),
                product.getId(),
                product.getName(),
                product.getSlug(),
                primaryImage,
                product.getPrice(),
                item.getQuantity(),
                colorForResponse(item.getColor()),
                lineTotal,
                product.isInStock());
    }

    private String colorForResponse(String color) {
        return color == null || color.isBlank() ? null : color;
    }
}
