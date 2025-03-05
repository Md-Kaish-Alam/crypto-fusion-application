package com.nuwaish.crypto_fusion.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nuwaish.crypto_fusion.modal.Coin;
import com.nuwaish.crypto_fusion.response.ApiResponse;
import com.nuwaish.crypto_fusion.service.CoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coins")
public class CoinController {

    @Autowired
    private CoinService coinService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Coin>>> getCoinsList(
            @RequestParam(name = "page", required = false, defaultValue = "1") int page) throws Exception {
        List<Coin> coins = coinService.getCoinsList(page);

        ApiResponse<List<Coin>> response = new ApiResponse<>();
        response.setData(coins);
        response.setMessage("Coins List Fetched Successfully!");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{coinId}/market-chart")
    public ResponseEntity<ApiResponse<JsonNode>> getMarketChart(@PathVariable String coinId,
                                                                @RequestParam("days") int days) throws Exception {

        String chart = coinService.getMarketChart(coinId, days);
        JsonNode jsonNode = objectMapper.readTree(chart);

        ApiResponse<JsonNode> response = new ApiResponse<>();
        response.setData(jsonNode);
        response.setMessage("Coin Market Chart Fetched Successfully!");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<JsonNode>> searchCoin(@RequestParam("query") String keyword) throws Exception {

        String coins = coinService.searchCoin(keyword);
        JsonNode jsonNode = objectMapper.readTree(coins);

        ApiResponse<JsonNode> response = new ApiResponse<>();
        response.setData(jsonNode);
        response.setMessage("Keyword searched successfully!");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/top50")
    public ResponseEntity<ApiResponse<JsonNode>> getTop50CoinByMarketCapRank() throws Exception {

        String coins = coinService.getTop50CoinsByMarketCapRank();
        JsonNode jsonNode = objectMapper.readTree(coins);

        ApiResponse<JsonNode> response = new ApiResponse<>();
        response.setData(jsonNode);
        response.setMessage("Keyword searched successfully!");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/trading")
    public ResponseEntity<ApiResponse<JsonNode>> getTradingCoins() throws Exception {

        String coins = coinService.getTradingCoins();
        JsonNode jsonNode = objectMapper.readTree(coins);

        ApiResponse<JsonNode> response = new ApiResponse<>();
        response.setData(jsonNode);
        response.setMessage("Trading coins fetched successfully!");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/details/{coinId}")
    public ResponseEntity<ApiResponse<JsonNode>> getCoinDetails(@PathVariable String coinId) throws Exception {

        String coin = coinService.getCoinDetails(coinId);
        JsonNode jsonNode = objectMapper.readTree(coin);

        ApiResponse<JsonNode> response = new ApiResponse<>();
        response.setData(jsonNode);
        response.setMessage("Coin Details fetched successfully!");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{coinId}")
    public ResponseEntity<ApiResponse<JsonNode>> getCoinById(@PathVariable String coinId) throws Exception {

        String coin = coinService.getCoinDetails(coinId);
        JsonNode jsonNode = objectMapper.readTree(coin);

        ApiResponse<JsonNode> response = new ApiResponse<>();
        response.setData(jsonNode);
        response.setMessage("Coin fetched Successfully!");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
