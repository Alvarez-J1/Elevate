package com.elevate.backend.dto.auth;

public record AuthResponse(
        String accessToken,
        String tokenType,
        long expiresInMillis,
        UserResponse user
) {

    public static AuthResponse of(String accessToken, long expiresInMillis, UserResponse user) {
        return new AuthResponse(accessToken, "Bearer", expiresInMillis, user);
    }
}
