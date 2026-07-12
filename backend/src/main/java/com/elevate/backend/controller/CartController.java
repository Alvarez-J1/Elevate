package com.elevate.backend.controller;

import com.elevate.backend.dto.cart.AddCartItemRequest;
import com.elevate.backend.dto.cart.CartResponse;
import com.elevate.backend.dto.cart.UpdateCartItemRequest;
import com.elevate.backend.security.SecurityUser;
import com.elevate.backend.service.CartService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Server-side cart for authenticated users. Guests are expected to keep
 * their cart client-side (localStorage) and only interact with the backend
 * at checkout time.
 */
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Tag(name = "Cart", description = "Server-persisted shopping cart for signed-in users")
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartResponse> getCart(@AuthenticationPrincipal SecurityUser principal) {
        return ResponseEntity.ok(cartService.getCart(principal.getId()));
    }

    @PostMapping("/items")
    public ResponseEntity<CartResponse> addItem(
            @AuthenticationPrincipal SecurityUser principal, @Valid @RequestBody AddCartItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.addItem(principal.getId(), request));
    }

    @PatchMapping("/items/{itemId}")
    public ResponseEntity<CartResponse> updateItem(
            @AuthenticationPrincipal SecurityUser principal,
            @PathVariable Long itemId,
            @Valid @RequestBody UpdateCartItemRequest request) {
        return ResponseEntity.ok(cartService.updateItemQuantity(principal.getId(), itemId, request.quantity()));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<CartResponse> removeItem(
            @AuthenticationPrincipal SecurityUser principal, @PathVariable Long itemId) {
        return ResponseEntity.ok(cartService.removeItem(principal.getId(), itemId));
    }

    @DeleteMapping
    public ResponseEntity<CartResponse> clearCart(@AuthenticationPrincipal SecurityUser principal) {
        return ResponseEntity.ok(cartService.clearCart(principal.getId()));
    }
}
