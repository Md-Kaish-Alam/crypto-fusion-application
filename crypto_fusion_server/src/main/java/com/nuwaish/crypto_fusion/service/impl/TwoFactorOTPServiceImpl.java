package com.nuwaish.crypto_fusion.service.impl;

import com.nuwaish.crypto_fusion.modal.TwoFactorOTP;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.repository.TwoFactorOTPRepository;
import com.nuwaish.crypto_fusion.service.TwoFactorOTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TwoFactorOTPServiceImpl implements TwoFactorOTPService {

    @Autowired
    private TwoFactorOTPRepository twoFactorOTPRepository;

    @Override
    public TwoFactorOTP createTwoFactorOTP(User user, String otp, String jwt) {
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();

        TwoFactorOTP twoFactorOTP = new TwoFactorOTP();
        twoFactorOTP.setId(id);
        twoFactorOTP.setOtp(otp);
        twoFactorOTP.setJwt(jwt);
        twoFactorOTP.setUser(user);
        return twoFactorOTPRepository.save(twoFactorOTP);
    }

    @Override
    public TwoFactorOTP findByUser(Long userId) {
        return twoFactorOTPRepository.findByUserId(userId);
    }

    @Override
    public TwoFactorOTP findById(String id) {
        return twoFactorOTPRepository.findById(id).orElse(null);
    }

    @Override
    public boolean verifyTwoFactorOTP(TwoFactorOTP twoFactorOTP, String otp) {
        return twoFactorOTP.getOtp().equals(otp);
    }

    @Override
    public void deleteTwoFactorOTP(TwoFactorOTP twoFactorOTP) {
        twoFactorOTPRepository.delete(twoFactorOTP);
    }


}
