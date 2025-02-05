package com.nuwaish.crypto_fusion.service;

import com.nuwaish.crypto_fusion.modal.PaymentDetails;
import com.nuwaish.crypto_fusion.modal.User;

public interface PaymentDetailsService {

    PaymentDetails addPaymentDetails(String accountNumber,
                                     String accountHolderName,
                                     String ifsc,
                                     String bankName,
                                     User user);

    PaymentDetails getUserPaymentDetails(User user);
}
