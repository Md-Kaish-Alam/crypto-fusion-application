package com.nuwaish.crypto_fusion.repository;

import com.nuwaish.crypto_fusion.modal.Coin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoinRepository extends JpaRepository<Coin, String> {
}
