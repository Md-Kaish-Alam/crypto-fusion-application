package com.nuwaish.crypto_fusion.repository;

import com.nuwaish.crypto_fusion.modal.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode , Long> {

    public VerificationCode findByUserId(Long userId);
}
