package com.nuwaish.crypto_fusion.controller;

import com.nuwaish.crypto_fusion.modal.Coin;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.modal.WatchList;
import com.nuwaish.crypto_fusion.response.ApiResponse;
import com.nuwaish.crypto_fusion.service.CoinService;
import com.nuwaish.crypto_fusion.service.UserService;
import com.nuwaish.crypto_fusion.service.WatchListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/watchlist")
public class WatchListController {

    @Autowired
    private WatchListService watchListService;

    @Autowired
    private UserService userService;

    @Autowired
    private CoinService coinService;

    @GetMapping("/user")
    public ResponseEntity<ApiResponse<WatchList>> getUserWatchList(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwt(jwt);

        WatchList watchList = watchListService.findUserWatchList(user.getId());

        ApiResponse<WatchList> response = new ApiResponse<>();
        response.setData(watchList);
        response.setMessage("User Watch List Details fetched successfully.");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<WatchList>> createWatchList(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwt(jwt);
        WatchList newWatchList = watchListService.createWatchList(user);

        ApiResponse<WatchList> response = new ApiResponse<>();
        response.setData(newWatchList);
        response.setMessage("User Watch List Created successfully.");
        response.setStatusCode(HttpStatus.CREATED.value());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{watchListId}")
    public ResponseEntity<ApiResponse<WatchList>> getWatchListById(
            @PathVariable Long watchListId) throws Exception {

        WatchList watchList = watchListService.findWatchListById(watchListId);

        ApiResponse<WatchList> response = new ApiResponse<>();
        response.setData(watchList);
        response.setMessage("Watch List Details fetched successfully.");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/add/coin/{coinId}")
    public ResponseEntity<ApiResponse<Coin>> addItemToWatchList(
            @RequestHeader("Authorization") String jwt,
            @PathVariable String coinId) throws Exception {

        User user = userService.findUserByJwt(jwt);

        Coin coin = coinService.findCoinById(coinId);
        Coin addedCoin = watchListService.addItemToWatchList(coin, user);

        ApiResponse<Coin> response = new ApiResponse<>();
        response.setData(addedCoin);
        response.setMessage("Coin added successfully into watch list.");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/remove/coin/{coinId}")
    public ResponseEntity<ApiResponse<Coin>> removeItemFromWatchList(
            @RequestHeader("Authorization") String jwt,
            @PathVariable String coinId) throws Exception {

        User user = userService.findUserByJwt(jwt);
        Coin coin = coinService.findCoinById(coinId);

        Coin removedCoin = watchListService.removeItemFromWatchList(coin, user);

        ApiResponse<Coin> response = new ApiResponse<>();
        response.setData(removedCoin);
        response.setMessage("Coin removed successfully from watch list.");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
