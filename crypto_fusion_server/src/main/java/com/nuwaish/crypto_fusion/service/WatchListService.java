package com.nuwaish.crypto_fusion.service;

import com.nuwaish.crypto_fusion.modal.Coin;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.modal.WatchList;

public interface WatchListService {

    WatchList findUserWatchList(Long userId) throws Exception;

    WatchList createWatchList(User user);

    WatchList findWatchListById(Long id) throws Exception;

    Coin addItemToWatchList(Coin coin, User user) throws Exception;

    Coin removeItemFromWatchList(Coin coin, User user) throws Exception;
}
