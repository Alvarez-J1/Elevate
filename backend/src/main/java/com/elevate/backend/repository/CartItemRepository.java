package com.elevate.backend.repository;

import com.elevate.backend.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByCart_IdAndProduct_IdAndColor(Long cartId, Long productId, String color);

    Optional<CartItem> findByIdAndCart_Id(Long id, Long cartId);
}
