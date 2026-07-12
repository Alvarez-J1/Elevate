package com.elevate.backend.controller;

import com.elevate.backend.dto.auth.UserResponse;
import com.elevate.backend.dto.user.AccountSummaryResponse;
import com.elevate.backend.mapper.UserMapper;
import com.elevate.backend.repository.OrderRepository;
import com.elevate.backend.repository.ReviewRepository;
import com.elevate.backend.repository.UserRepository;
import com.elevate.backend.exception.ResourceNotFoundException;
import com.elevate.backend.security.SecurityUser;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "Authenticated user profile")
public class UserController {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ReviewRepository reviewRepository;
    private final UserMapper userMapper;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(@AuthenticationPrincipal SecurityUser principal) {
        var user = userRepository.findById(principal.getId())
                .orElseThrow(() -> ResourceNotFoundException.of("User", principal.getId()));
        return ResponseEntity.ok(userMapper.toResponse(user));
    }

    @GetMapping("/me/summary")
    public ResponseEntity<AccountSummaryResponse> summary(@AuthenticationPrincipal SecurityUser principal) {
        var user = userRepository.findById(principal.getId())
                .orElseThrow(() -> ResourceNotFoundException.of("User", principal.getId()));

        return ResponseEntity.ok(new AccountSummaryResponse(
                user.isEnabled(),
                user.getCreatedAt(),
                orderRepository.countByUser_Id(user.getId()),
                reviewRepository.countByUser_Id(user.getId())));
    }
}
