package com.nuwaish.crypto_fusion.repository;

import com.nuwaish.crypto_fusion.modal.Withdrawal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WithdrawalRepository extends JpaRepository<Withdrawal, Long> {

    List<Withdrawal> findWithdrawalByUserId(Long userId);
}
