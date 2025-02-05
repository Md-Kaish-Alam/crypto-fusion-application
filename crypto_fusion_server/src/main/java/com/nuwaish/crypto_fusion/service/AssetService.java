package com.nuwaish.crypto_fusion.service;

import com.nuwaish.crypto_fusion.modal.Asset;
import com.nuwaish.crypto_fusion.modal.Coin;
import com.nuwaish.crypto_fusion.modal.User;

import java.util.List;

public interface AssetService {

    Asset createAsset(User user, Coin coin, double quantity);

    Asset getAssetById(Long assetId) throws Exception;

    Asset getAssetByUserIdAndAssetId(Long userId, Long assetId);

    List<Asset> getUserAsset(Long userId);

    Asset updateAsset(Long assetId, double quantity) throws Exception;

    Asset findAssetByUserIdAndCoinId(Long userId, String coinId);

    void deleteAsset(Long assetId);

}
