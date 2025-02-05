package com.nuwaish.crypto_fusion.service.impl;

import com.nuwaish.crypto_fusion.config.JwtProvider;
import com.nuwaish.crypto_fusion.domain.VERIFICATION_TYPE;
import com.nuwaish.crypto_fusion.modal.TwoFactorAuth;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.repository.UserRepository;
import com.nuwaish.crypto_fusion.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findUserByJwt(String jwt) throws Exception {
        String email = JwtProvider.getEmailFromJwtToken(jwt);
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty())
            throw new Exception("User not found");

        return user.get();
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty())
            throw new Exception("User not found");

        return user.get();
    }

    @Override
    public User findUserById(Long userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty())
            throw new Exception("User not Found");

        return user.get();
    }

    @Override
    public User enableTwoFactorAuthentication(VERIFICATION_TYPE verificationType, String sendTo, User user) {
        TwoFactorAuth twoFactorAuth = new TwoFactorAuth();
        twoFactorAuth.setEnabled(true);
        twoFactorAuth.setSendTo(verificationType);

        user.setTwoFactorAuth(twoFactorAuth);

        return userRepository.save(user);
    }

    @Override
    public User updatePassword(User user, String newPassword) {
        user.setPassword(newPassword);
        return userRepository.save(user);
    }
}
