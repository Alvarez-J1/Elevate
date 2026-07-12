package com.elevate.backend.repository;

import com.elevate.backend.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findByOrderNumberAndUser_Id(String orderNumber, Long userId);

    Optional<Order> findByIdAndUser_Id(Long id, Long userId);

    Page<Order> findByUser_IdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    boolean existsByOrderNumber(String orderNumber);
}
