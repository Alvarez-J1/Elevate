package com.elevate.backend.service;

import com.elevate.backend.dto.auth.AuthResponse;
import com.elevate.backend.dto.auth.LoginRequest;
import com.elevate.backend.dto.auth.RegisterRequest;
import com.elevate.backend.dto.auth.UserResponse;
import com.elevate.backend.entity.Cart;
import com.elevate.backend.entity.User;
import com.elevate.backend.exception.DuplicateResourceException;
import com.elevate.backend.mapper.UserMapper;
import com.elevate.backend.repository.CartRepository;
import com.elevate.backend.repository.UserRepository;
import com.elevate.backend.security.JwtService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private CartRepository cartRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private JwtService jwtService;
    @Mock
    private UserMapper userMapper;

    private AuthService authService() {
        return new AuthService(userRepository, cartRepository, passwordEncoder, authenticationManager, jwtService, userMapper);
    }

    @Test
    void register_throwsWhenEmailAlreadyExists() {
        given(userRepository.existsByEmailIgnoreCase("dupe@example.com")).willReturn(true);

        RegisterRequest request = new RegisterRequest("Jane", "Doe", "dupe@example.com", "password123");

        assertThrows(DuplicateResourceException.class, () -> authService().register(request));
    }

    @Test
    void register_hashesPasswordAndCreatesCart() {
        given(userRepository.existsByEmailIgnoreCase(anyString())).willReturn(false);
        given(passwordEncoder.encode("password123")).willReturn("hashed-pw");
        given(userRepository.save(any(User.class))).willAnswer(invocation -> invocation.getArgument(0));
        given(cartRepository.save(any(Cart.class))).willAnswer(invocation -> invocation.getArgument(0));
        given(jwtService.generateToken(any())).willReturn("token-123");
        given(jwtService.getExpirationMillis()).willReturn(86_400_000L);
        given(userMapper.toResponse(any(User.class)))
                .willReturn(new UserResponse(1L, "Jane", "Doe", "jane@example.com", "USER"));

        RegisterRequest request = new RegisterRequest("Jane", "Doe", "jane@example.com", "password123");
        AuthResponse response = authService().register(request);

        assertThat(response.accessToken()).isEqualTo("token-123");
        assertThat(response.expiresInMillis()).isEqualTo(86_400_000L);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        assertThat(userCaptor.getValue().getPasswordHash()).isEqualTo("hashed-pw");
        assertThat(userCaptor.getValue().getEmail()).isEqualTo("jane@example.com");

        verify(cartRepository).save(any(Cart.class));
    }

    @Test
    void login_propagatesBadCredentials() {
        given(authenticationManager.authenticate(any())).willThrow(new BadCredentialsException("Invalid credentials"));

        LoginRequest request = new LoginRequest("jane@example.com", "wrong-password");

        assertThrows(BadCredentialsException.class, () -> authService().login(request));
    }

    @Test
    void login_returnsTokenOnSuccess() {
        User user = User.builder()
                .email("jane@example.com")
                .passwordHash("hashed-pw")
                .firstName("Jane")
                .lastName("Doe")
                .build();

        given(authenticationManager.authenticate(any())).willReturn(null);
        given(userRepository.findByEmailIgnoreCase("jane@example.com")).willReturn(Optional.of(user));
        given(jwtService.generateToken(any())).willReturn("token-456");
        given(jwtService.getExpirationMillis()).willReturn(86_400_000L);
        given(userMapper.toResponse(user)).willReturn(new UserResponse(1L, "Jane", "Doe", "jane@example.com", "USER"));

        LoginRequest request = new LoginRequest("jane@example.com", "password123");
        AuthResponse response = authService().login(request);

        assertThat(response.accessToken()).isEqualTo("token-456");
    }
}
