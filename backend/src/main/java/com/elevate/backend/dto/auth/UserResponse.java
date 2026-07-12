package com.elevate.backend.dto.auth;

public record UserResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        String role
) {
}
