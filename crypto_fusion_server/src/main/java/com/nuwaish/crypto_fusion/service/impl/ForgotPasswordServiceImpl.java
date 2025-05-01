package com.nuwaish.crypto_fusion.service.impl;

import com.nuwaish.crypto_fusion.domain.VERIFICATION_TYPE;
import com.nuwaish.crypto_fusion.exception.InvalidTokenException;
import com.nuwaish.crypto_fusion.modal.ForgotPasswordToken;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.repository.ForgotPasswordRepository;
import com.nuwaish.crypto_fusion.service.ForgotPasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ForgotPasswordServiceImpl implements ForgotPasswordService {

    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;

    @Override
    public ForgotPasswordToken createToken(User user,
                                           String id,
                                           String otp,
                                           VERIFICATION_TYPE verificationType,
                                           String sendTo) {

        ForgotPasswordToken token = new ForgotPasswordToken();
        token.setUser(user);
        token.setSendTo(sendTo);
        token.setVerificationType(verificationType);
        token.setId(UUID.fromString(id));
        token.setOtp(otp);

        return forgotPasswordRepository.save(token);
    }

    @Override
    public ForgotPasswordToken findTokenById(UUID id) {
        return forgotPasswordRepository.findById(id)
                .orElseThrow(() -> new InvalidTokenException("Invalid or expired token."));
    }

    @Override
    public ForgotPasswordToken findTokenByUser(Long userId) {
        return forgotPasswordRepository.findByUserId(userId);
    }

    @Override
    public void deleteToken(ForgotPasswordToken token) {
        forgotPasswordRepository.delete(token);
    }
}
