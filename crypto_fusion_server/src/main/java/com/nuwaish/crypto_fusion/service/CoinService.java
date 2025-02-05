package com.nuwaish.crypto_fusion.service;

import com.nuwaish.crypto_fusion.modal.Coin;

import java.util.List;

public interface CoinService {

    List<Coin> getCoinsList(int page) throws Exception;

    String getMarketChart(String coinId, int days) throws Exception;

    String getCoinDetails(String coinId) throws Exception;

    Coin findCoinById(String coinId) throws Exception;

    String searchCoin(String keyword) throws Exception;

    String getTop50CoinsByMarketCapRank() throws Exception;

    String getTradingCoins() throws Exception;
}
