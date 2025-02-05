package com.nuwaish.crypto_fusion.service;

import com.nuwaish.crypto_fusion.domain.ORDER_TYPE;
import com.nuwaish.crypto_fusion.modal.Coin;
import com.nuwaish.crypto_fusion.modal.Order;
import com.nuwaish.crypto_fusion.modal.OrderItem;
import com.nuwaish.crypto_fusion.modal.User;

import java.util.List;

public interface OrderService {

    Order createOrder(User user, OrderItem orderItem, ORDER_TYPE orderType);

    Order getOrderById(Long orderId) throws Exception;

    List<Order> getAllOrdersOfUser(Long userId, ORDER_TYPE orderType, String assetSymbol);

    Order processOrder(Coin coin, double quantity, ORDER_TYPE orderType, User user) throws Exception;
}
