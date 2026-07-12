package com.elevate.backend.entity;

/**
 * Application-level roles. Spring Security authorities are derived from
 * these by prefixing with {@code ROLE_}.
 */
public enum Role {
    USER,
    ADMIN
}
