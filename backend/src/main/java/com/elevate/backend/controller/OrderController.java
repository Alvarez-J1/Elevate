package com.elevate.backend.controller;

import com.elevate.backend.dto.common.PageResponse;
import com.elevate.backend.dto.order.CheckoutRequest;
import com.elevate.backend.dto.order.OrderResponse;
import com.elevate.backend.security.SecurityUser;
import com.elevate.backend.service.OrderService;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Tag(name = "Orders", description = "Checkout and order history, supporting both guest and authenticated purchases")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @SecurityRequirements
    public ResponseEntity<OrderResponse> checkout(
            @AuthenticationPrincipal SecurityUser principal, @Valid @RequestBody CheckoutRequest request) {
        Long userId = principal != null ? principal.getId() : null;
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.checkout(userId, request));
    }

    @GetMapping("/number/{orderNumber}")
    public ResponseEntity<OrderResponse> findByOrderNumber(
            @AuthenticationPrincipal SecurityUser principal, @PathVariable String orderNumber) {
        return ResponseEntity.ok(orderService.findByOrderNumberForUser(principal.getId(), orderNumber));
    }

    @GetMapping
    public ResponseEntity<PageResponse<OrderResponse>> findOrders(
            @AuthenticationPrincipal SecurityUser principal, @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(orderService.findMyOrders(principal.getId(), pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> findOrderById(
            @AuthenticationPrincipal SecurityUser principal, @PathVariable Long id) {
        return ResponseEntity.ok(orderService.findByIdForUser(principal.getId(), id));
    }

    @GetMapping("/me")
    public ResponseEntity<PageResponse<OrderResponse>> findMyOrders(
            @AuthenticationPrincipal SecurityUser principal, @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(orderService.findMyOrders(principal.getId(), pageable));
    }

    @GetMapping("/me/{id}")
    public ResponseEntity<OrderResponse> findMyOrderById(
            @AuthenticationPrincipal SecurityUser principal, @PathVariable Long id) {
        return ResponseEntity.ok(orderService.findByIdForUser(principal.getId(), id));
    }
}
