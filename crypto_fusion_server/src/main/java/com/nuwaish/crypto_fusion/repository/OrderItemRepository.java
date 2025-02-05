package com.nuwaish.crypto_fusion.repository;

import com.nuwaish.crypto_fusion.modal.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
