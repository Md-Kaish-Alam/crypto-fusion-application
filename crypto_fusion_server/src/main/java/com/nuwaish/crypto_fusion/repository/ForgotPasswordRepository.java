package com.nuwaish.crypto_fusion.repository;

import com.nuwaish.crypto_fusion.modal.ForgotPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPasswordToken, String> {

    ForgotPasswordToken findByUserId(Long userId);
    Optional<ForgotPasswordToken> findById(UUID id);
}
