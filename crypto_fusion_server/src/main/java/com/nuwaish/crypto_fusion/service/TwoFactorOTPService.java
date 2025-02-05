package com.nuwaish.crypto_fusion.service;

import com.nuwaish.crypto_fusion.modal.TwoFactorOTP;
import com.nuwaish.crypto_fusion.modal.User;

public interface TwoFactorOTPService {

    TwoFactorOTP createTwoFactorOTP(User user, String otp, String jwt);

    TwoFactorOTP findByUser(Long userId);

    TwoFactorOTP findById(String id);

    boolean verifyTwoFactorOTP(TwoFactorOTP twoFactorOTP, String otp);

    void deleteTwoFactorOTP(TwoFactorOTP twoFactorOTP);
}
