package com.nuwaish.crypto_fusion.repository;

import com.nuwaish.crypto_fusion.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
