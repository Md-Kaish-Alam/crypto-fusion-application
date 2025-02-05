package com.nuwaish.crypto_fusion.service;

import com.nuwaish.crypto_fusion.domain.VERIFICATION_TYPE;
import com.nuwaish.crypto_fusion.modal.User;

public interface UserService {

    public User findUserByJwt(String jwt) throws Exception;
    public User findUserByEmail(String email) throws Exception;
    public User findUserById(Long userId) throws Exception;

    public User enableTwoFactorAuthentication(VERIFICATION_TYPE verificationType, String sendTo, User user);

    User updatePassword(User user, String newPassword);
}
