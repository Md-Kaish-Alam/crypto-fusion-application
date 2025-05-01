package com.nuwaish.crypto_fusion.service;


import com.nuwaish.crypto_fusion.domain.VERIFICATION_TYPE;
import com.nuwaish.crypto_fusion.modal.ForgotPasswordToken;
import com.nuwaish.crypto_fusion.modal.User;

import java.util.UUID;

public interface ForgotPasswordService {

    ForgotPasswordToken createToken(User user,
                                    String id,
                                    String otp,
                                    VERIFICATION_TYPE verificationType,
                                    String sendTo);

    ForgotPasswordToken findTokenById(UUID id);

    ForgotPasswordToken findTokenByUser(Long userId);

    void deleteToken(ForgotPasswordToken token);
}
