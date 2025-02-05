package com.nuwaish.crypto_fusion.repository;

import com.nuwaish.crypto_fusion.modal.PaymentOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentOrderRepository extends JpaRepository<PaymentOrder, Long> {
}
