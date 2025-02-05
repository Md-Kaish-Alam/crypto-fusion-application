package com.nuwaish.crypto_fusion.repository;

import com.nuwaish.crypto_fusion.modal.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
}
