package com.nuwaish.crypto_fusion.repository;

import com.nuwaish.crypto_fusion.modal.TwoFactorOTP;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TwoFactorOTPRepository extends JpaRepository<TwoFactorOTP, String> {
    TwoFactorOTP findByUserId(Long userId);
}
