package com.nuwaish.crypto_fusion.service;

import com.nuwaish.crypto_fusion.domain.WALLET_TRANSACTION_TYPE;
import com.nuwaish.crypto_fusion.modal.Wallet;
import com.nuwaish.crypto_fusion.modal.WalletTransaction;

import java.util.List;

public interface WalletTransactionService {

    WalletTransaction createTransaction(Wallet wallet,
                                        WALLET_TRANSACTION_TYPE type,
                                        String transferId,
                                        String purpose,
                                        Long amount
    );

    List<WalletTransaction> getTransactions(Wallet wallet, WALLET_TRANSACTION_TYPE type);
}
