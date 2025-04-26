package com.nuwaish.crypto_fusion.service.impl;

import com.nuwaish.crypto_fusion.modal.*;
import com.nuwaish.crypto_fusion.repository.WatchListRepository;
import com.nuwaish.crypto_fusion.service.WatchListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WatchListServiceImpl implements WatchListService {

    @Autowired
    private WatchListRepository watchListRepository;

    @Override
    public WatchList findUserWatchList(Long userId) throws Exception {
        WatchList watchList = watchListRepository.findWatchListByUserId(userId);
        if (watchList == null) {
            throw new Exception("Watch List not found!");
        }
        return watchList;
    }

    @Override
    public WatchList createWatchList(User user) {
        WatchList watchList = new WatchList();
        watchList.setUser(user);
        return watchListRepository.save(watchList);
    }

    @Override
    public WatchList findWatchListById(Long id) throws Exception {
        Optional<WatchList> watchList = watchListRepository.findById(id);

        if (watchList.isEmpty()) {
            throw new Exception("Watch List not found!");
        }

        return watchList.get();
    }

    @Override
    public Coin addItemToWatchList(Coin coin, User user) throws Exception {
        WatchList watchList = findUserWatchList(user.getId());

        if (watchList.getCoin().contains(coin)) {
            watchList.getCoin().remove(coin);
        } else {
            watchList.getCoin().add(coin);
        }

        watchListRepository.save(watchList);

        return coin;
    }

    @Override
    public Coin removeItemFromWatchList(Coin coin, User user) throws Exception {
        WatchList watchList = findUserWatchList(user.getId());

        if (watchList.getCoin().contains(coin)) {
            watchList.getCoin().remove(coin);
            watchListRepository.save(watchList);
        } else {
            throw new Exception("Coin not found in the watchlist!");
        }

        return coin;
    }
}
