package com.nuwaish.crypto_fusion.repository;

import com.nuwaish.crypto_fusion.modal.PaymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails, Long> {

    PaymentDetails findPaymentDetailsByUserId(Long userId);
}
