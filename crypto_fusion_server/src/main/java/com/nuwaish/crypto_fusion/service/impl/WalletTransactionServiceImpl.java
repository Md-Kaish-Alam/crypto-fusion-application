package com.nuwaish.crypto_fusion.service.impl;

import com.nuwaish.crypto_fusion.domain.WALLET_TRANSACTION_TYPE;
import com.nuwaish.crypto_fusion.modal.Wallet;
import com.nuwaish.crypto_fusion.modal.WalletTransaction;
import com.nuwaish.crypto_fusion.repository.WalletTransactionRepository;
import com.nuwaish.crypto_fusion.service.WalletTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class WalletTransactionServiceImpl implements WalletTransactionService {

    @Autowired
    private WalletTransactionRepository walletTransactionRepository;

    @Override
    public WalletTransaction createTransaction(Wallet wallet, WALLET_TRANSACTION_TYPE type, String transferId, String purpose, Long amount) {
        WalletTransaction transaction = new WalletTransaction();
        transaction.setWallet(wallet);
        transaction.setDate(LocalDate.now());
        transaction.setType(type);
        transaction.setTransferId(transferId);
        transaction.setPurpose(purpose);
        transaction.setAmount(amount);

        return walletTransactionRepository.save(transaction);
    }

    @Override
    public List<WalletTransaction> getTransactions(Wallet wallet, WALLET_TRANSACTION_TYPE type) {
        return walletTransactionRepository.findByWalletOrderByDateDesc(wallet);
    }
}
