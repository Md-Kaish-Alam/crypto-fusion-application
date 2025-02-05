package com.nuwaish.crypto_fusion.repository;

import com.nuwaish.crypto_fusion.modal.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetRepository extends JpaRepository<Asset, Long> {

    List<Asset> findAssetByUserId(Long userId);

    Asset findAssetByUserIdAndCoinId(Long userId, String coinId);
}
