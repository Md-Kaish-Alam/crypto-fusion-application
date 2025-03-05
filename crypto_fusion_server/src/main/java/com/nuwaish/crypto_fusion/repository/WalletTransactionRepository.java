package com.nuwaish.crypto_fusion.repository;

import com.nuwaish.crypto_fusion.modal.Wallet;
import com.nuwaish.crypto_fusion.modal.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {

    List<WalletTransaction> findByWalletOrderByDateDesc(Wallet wallet);

}
