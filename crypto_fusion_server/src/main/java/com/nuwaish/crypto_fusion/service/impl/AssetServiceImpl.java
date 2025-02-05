package com.nuwaish.crypto_fusion.service.impl;

import com.nuwaish.crypto_fusion.modal.Asset;
import com.nuwaish.crypto_fusion.modal.Coin;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.repository.AssetRepository;
import com.nuwaish.crypto_fusion.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssetServiceImpl implements AssetService {

    @Autowired
    private AssetRepository assetRepository;

    @Override
    public Asset createAsset(User user, Coin coin, double quantity) {
        Asset asset = new Asset();
        asset.setUser(user);
        asset.setCoin(coin);
        asset.setQuantity(quantity);
        asset.setBuyPrice(coin.getCurrentPrice());

        return assetRepository.save(asset);
    }

    @Override
    public Asset getAssetById(Long assetId) throws Exception {
        return assetRepository.findById(assetId).orElseThrow(() -> new Exception("Asset not found!"));
    }

    @Override
    public Asset getAssetByUserIdAndAssetId(Long userId, Long assetId) {
        return null;
    }

    @Override
    public List<Asset> getUserAsset(Long userId) {
        return assetRepository.findAssetByUserId(userId);
    }

    @Override
    public Asset updateAsset(Long assetId, double quantity) throws Exception {
        Asset oldAsset = getAssetById(assetId);
        oldAsset.setQuantity(quantity + oldAsset.getQuantity());
        return assetRepository.save(oldAsset);
    }

    @Override
    public Asset findAssetByUserIdAndCoinId(Long userId, String coinId) {
        return assetRepository.findAssetByUserIdAndCoinId(userId, coinId);
    }

    @Override
    public void deleteAsset(Long assetId) {
        assetRepository.deleteById(assetId);
    }
}
