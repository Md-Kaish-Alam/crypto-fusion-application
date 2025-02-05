package com.nuwaish.crypto_fusion.service.impl;

import com.nuwaish.crypto_fusion.domain.WITHDRAWAL_STATUS;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.modal.Withdrawal;
import com.nuwaish.crypto_fusion.repository.WithdrawalRepository;
import com.nuwaish.crypto_fusion.service.WithdrawalService;
import lombok.With;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WithdrawalServiceImpl implements WithdrawalService {

    @Autowired
    private WithdrawalRepository withdrawalRepository;

    @Override
    public Withdrawal requestWithdrawal(Long amount, User user) {
        Withdrawal withdrawal = new Withdrawal();
        withdrawal.setAmount(amount);
        withdrawal.setUser(user);
        withdrawal.setStatus(WITHDRAWAL_STATUS.PENDING);
        return withdrawalRepository.save(withdrawal);
    }

    @Override
    public Withdrawal proceedWithdrawal(Long withdrawalId, boolean accept) throws Exception {
        Optional<Withdrawal> withdrawal = withdrawalRepository.findById(withdrawalId);

        if (withdrawal.isEmpty()) {
            throw new Exception("Withdrawal Not Found");
        }

        Withdrawal withdrawal1 = withdrawal.get();
        withdrawal1.setDate(LocalDateTime.now());

        if (accept) {
            withdrawal1.setStatus(WITHDRAWAL_STATUS.SUCCESS);
        } else {
            withdrawal1.setStatus(WITHDRAWAL_STATUS.DECLINED);
        }
        return withdrawalRepository.save(withdrawal1);
    }

    @Override
    public List<Withdrawal> getUserWithdrawalHistory(User user) {
        return withdrawalRepository.findWithdrawalByUserId(user.getId());
    }

    @Override
    public List<Withdrawal> getAllWithdrawalRequest() {
        return withdrawalRepository.findAll();
    }
}
