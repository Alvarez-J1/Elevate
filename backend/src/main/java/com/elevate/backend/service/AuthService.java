package com.elevate.backend.service;

import com.elevate.backend.dto.auth.AuthResponse;
import com.elevate.backend.dto.auth.LoginRequest;
import com.elevate.backend.dto.auth.RegisterRequest;
import com.elevate.backend.entity.Cart;
import com.elevate.backend.entity.Role;
import com.elevate.backend.entity.User;
import com.elevate.backend.exception.DuplicateResourceException;
import com.elevate.backend.mapper.UserMapper;
import com.elevate.backend.repository.CartRepository;
import com.elevate.backend.repository.UserRepository;
import com.elevate.backend.security.JwtService;
import com.elevate.backend.security.SecurityUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserMapper userMapper;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new DuplicateResourceException("An account with this email already exists");
        }

        User user = User.builder()
                .firstName(request.firstName().trim())
                .lastName(request.lastName().trim())
                .email(request.email().trim().toLowerCase())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(Role.USER)
                .enabled(true)
                .build();

        user = userRepository.save(user);

        Cart cart = Cart.builder().user(user).build();
        cartRepository.save(cart);

        SecurityUser securityUser = new SecurityUser(user);
        String token = jwtService.generateToken(securityUser);

        return AuthResponse.of(token, jwtService.getExpirationMillis(), userMapper.toResponse(user));
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email().trim().toLowerCase(), request.password()));

        User user = userRepository.findByEmailIgnoreCase(request.email())
                .orElseThrow(() -> new IllegalStateException("Authenticated user could not be reloaded"));

        SecurityUser securityUser = new SecurityUser(user);
        String token = jwtService.generateToken(securityUser);

        return AuthResponse.of(token, jwtService.getExpirationMillis(), userMapper.toResponse(user));
    }
}
