package com.elevate.backend.mapper;

import com.elevate.backend.dto.auth.UserResponse;
import com.elevate.backend.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole().name());
    }
}
