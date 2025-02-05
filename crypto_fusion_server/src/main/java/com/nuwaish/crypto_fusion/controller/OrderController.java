package com.nuwaish.crypto_fusion.controller;

import com.nuwaish.crypto_fusion.domain.ORDER_TYPE;
import com.nuwaish.crypto_fusion.modal.Coin;
import com.nuwaish.crypto_fusion.modal.Order;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.request.CreateOrderRequest;
import com.nuwaish.crypto_fusion.response.ApiResponse;
import com.nuwaish.crypto_fusion.service.CoinService;
import com.nuwaish.crypto_fusion.service.OrderService;
import com.nuwaish.crypto_fusion.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private CoinService coinService;

    @Autowired
    private UserService userService;

//    @Autowired
//    private WalletTransactionService walletTransactionService;

    @PostMapping("/pay")
    public ResponseEntity<ApiResponse<Order>> payOrderPayment(
            @RequestHeader("Authorization") String jwt,
            @RequestBody CreateOrderRequest req) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Coin coin = coinService.findCoinById(req.getCoinId());

        Order order = orderService.processOrder(coin, req.getQuantity(), req.getOrderType(), user);

        ApiResponse<Order> response = new ApiResponse<>();
        response.setData(order);
        response.setMessage("Order Payment Successfully.");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<Order>> getOrderById(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long orderId) throws Exception {

        User user = userService.findUserByJwt(jwt);
        Order order = orderService.getOrderById(orderId);

        ApiResponse<Order> response = new ApiResponse<>();
        response.setData(order);
        response.setMessage("Order fetched successfully.");
        response.setStatusCode(HttpStatus.OK.value());

        if (order.getUser().getId().equals(user.getId())) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Order>>> getAllOrdersOfUser(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(required = false) ORDER_TYPE order_type,
            @RequestParam(required = false) String asset_symbol
    ) throws Exception {

        Long userId = userService.findUserByJwt(jwt).getId();

        List<Order> userOrders = orderService.getAllOrdersOfUser(userId, order_type, asset_symbol);

        ApiResponse<List<Order>> response = new ApiResponse<>();
        response.setData(userOrders);
        response.setMessage("User's all orders fetched successfully. ");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
