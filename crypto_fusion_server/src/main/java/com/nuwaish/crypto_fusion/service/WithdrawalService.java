package com.nuwaish.crypto_fusion.service;

import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.modal.Withdrawal;

import java.util.List;

public interface WithdrawalService {

    Withdrawal requestWithdrawal(Long amount, User user);

    Withdrawal proceedWithdrawal(Long withdrawalId, boolean accept) throws Exception;

    List<Withdrawal> getUserWithdrawalHistory(User user);

    List<Withdrawal> getAllWithdrawalRequest();
}
