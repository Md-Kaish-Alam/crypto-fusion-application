package com.nuwaish.crypto_fusion.service;

import com.nuwaish.crypto_fusion.domain.VERIFICATION_TYPE;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.modal.VerificationCode;

public interface VerificationCodeService {

    VerificationCode sendVerificationCode(User user, VERIFICATION_TYPE verificationType);

    VerificationCode getVerificationCodeById(Long id) throws Exception;

    VerificationCode getVerificationCodeByUser(Long userId);

    void deleteVerificationCodeById(VerificationCode verificationCode);
}
