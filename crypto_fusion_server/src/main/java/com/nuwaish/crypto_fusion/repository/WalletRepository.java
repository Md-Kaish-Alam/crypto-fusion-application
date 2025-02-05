package com.nuwaish.crypto_fusion.repository;

import com.nuwaish.crypto_fusion.modal.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepository extends JpaRepository<Wallet, Long> {

    Wallet findWalletByUserId(Long userId);
}
