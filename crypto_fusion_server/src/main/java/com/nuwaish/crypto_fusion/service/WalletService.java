package com.nuwaish.crypto_fusion.service;

import com.nuwaish.crypto_fusion.modal.Order;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.modal.Wallet;

public interface WalletService {

    Wallet getUserWallet(User user);

    Wallet addBalanceToWallet(Wallet wallet, Long amount);

    Wallet findWalletById(Long id) throws Exception;

    Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws Exception;

    Wallet payOrderPayment(Order order, User user) throws Exception;
}
