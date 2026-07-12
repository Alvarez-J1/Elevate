package com.elevate.backend.entity;

/**
 * Lifecycle states for a customer order.
 */
public enum OrderStatus {
    PENDING,
    PAID,
    PROCESSING,
    SHIPPED,
    DELIVERED,
    CANCELLED
}
