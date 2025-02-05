package com.nuwaish.crypto_fusion.service.impl;

import com.nuwaish.crypto_fusion.modal.PaymentDetails;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.repository.PaymentDetailsRepository;
import com.nuwaish.crypto_fusion.service.PaymentDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService {

    @Autowired
    private PaymentDetailsRepository paymentDetailsRepository;

    @Override
    public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String ifsc, String bankName, User user) {
        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setAccountNumber(accountNumber);
        paymentDetails.setAccountHolderName(accountHolderName);
        paymentDetails.setBankName(bankName);
        paymentDetails.setIfsc(ifsc);
        paymentDetails.setUser(user);
        return paymentDetailsRepository.save(paymentDetails);
    }

    @Override
    public PaymentDetails getUserPaymentDetails(User user) {
        return paymentDetailsRepository.findPaymentDetailsByUserId(user.getId());
    }
}
