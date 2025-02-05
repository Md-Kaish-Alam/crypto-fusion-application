package com.nuwaish.crypto_fusion.controller;

import com.nuwaish.crypto_fusion.modal.Asset;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.response.ApiResponse;
import com.nuwaish.crypto_fusion.service.AssetService;
import com.nuwaish.crypto_fusion.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asset")
public class AssetController {

    @Autowired
    private AssetService assetService;

    @Autowired
    private UserService userService;

    @GetMapping("/{assetId}")
    public ResponseEntity<ApiResponse<Asset>> getAssetById(
            @PathVariable Long assetId
    ) throws Exception {
        Asset asset = assetService.getAssetById(assetId);

        ApiResponse<Asset> response = new ApiResponse<>();
        response.setData(asset);
        response.setMessage("Asset details fetched successfully.");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/coin/{coinId}/user")
    public ResponseEntity<ApiResponse<Asset>> getAssetByUserIdAndCoinId(
            @RequestHeader("Authorization") String jwt,
            @PathVariable String coinId
    ) throws Exception {

        User user = userService.findUserByJwt(jwt);
        Asset asset = assetService.findAssetByUserIdAndCoinId(user.getId(), coinId);

        ApiResponse<Asset> response = new ApiResponse<>();
        response.setData(asset);
        response.setMessage("Asset details fetched successfully.");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Asset>>> getAssetsOfUser(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserByJwt(jwt);

        List<Asset> assets = assetService.getUserAsset(user.getId());

        ApiResponse<List<Asset>> response = new ApiResponse<>();
        response.setData(assets);
        response.setMessage("Assets details fetched successfully.");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
