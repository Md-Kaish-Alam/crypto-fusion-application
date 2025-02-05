package com.nuwaish.crypto_fusion.service.impl;

import com.nuwaish.crypto_fusion.domain.ORDER_STATUS;
import com.nuwaish.crypto_fusion.domain.ORDER_TYPE;
import com.nuwaish.crypto_fusion.modal.*;
import com.nuwaish.crypto_fusion.repository.OrderItemRepository;
import com.nuwaish.crypto_fusion.repository.OrderRepository;
import com.nuwaish.crypto_fusion.service.AssetService;
import com.nuwaish.crypto_fusion.service.OrderService;
import com.nuwaish.crypto_fusion.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private WalletService walletService;

    @Autowired
    private AssetService assetService;

    private OrderItem createOrderItem(Coin coin, double quantity, double buyPrice, double sellPrice) {
        OrderItem orderItem = new OrderItem();
        orderItem.setCoin(coin);
        orderItem.setQuantity(quantity);
        orderItem.setBuyPrice(buyPrice);
        orderItem.setSellPrice(sellPrice);
        return orderItemRepository.save(orderItem);
    }

    @Transactional
    public Order buyAsset(Coin coin, double quantity, User user) throws Exception {
        if (quantity <= 0) {
            throw new Exception("Quantity should be greater than 0");
        }

        double buyPrice = coin.getCurrentPrice();
        OrderItem orderItem = createOrderItem(coin, quantity, buyPrice, 0);

        Order order = createOrder(user, orderItem, ORDER_TYPE.BUY);
        orderItem.setOrder(order);

        walletService.payOrderPayment(order, user);

        order.setStatus(ORDER_STATUS.SUCCESS);
        order.setOrderType(ORDER_TYPE.BUY);

        Order savedOrder = orderRepository.save(order);

        // create asset.
        Asset oldAsset = assetService.findAssetByUserIdAndCoinId(
                order.getUser().getId(), order.getOrderItem().getCoin().getId());

        if (oldAsset == null) {
            assetService.createAsset(user, orderItem.getCoin(), orderItem.getQuantity());
        } else {
            assetService.updateAsset(oldAsset.getId(), quantity);
        }

        return savedOrder;
    }

    @Transactional
    public Order sellAsset(Coin coin, double quantity, User user) throws Exception {
        if (quantity <= 0) {
            throw new Exception("Quantity should be greater than 0");
        }

        double sellPrice = coin.getCurrentPrice();

        Asset assetToSell = assetService.findAssetByUserIdAndCoinId(user.getId(), coin.getId());

        if (assetToSell != null) {

            double buyPrice = assetToSell.getBuyPrice();
            OrderItem orderItem = createOrderItem(coin, quantity, buyPrice, sellPrice);

            Order order = createOrder(user, orderItem, ORDER_TYPE.SELL);
            orderItem.setOrder(order);

            if (assetToSell.getQuantity() >= quantity) {
                order.setStatus(ORDER_STATUS.SUCCESS);
                order.setOrderType(ORDER_TYPE.SELL);
                Order savedOrder = orderRepository.save(order);

                walletService.payOrderPayment(order, user);

                Asset updatedAsset = assetService.updateAsset(assetToSell.getId(), -quantity);

                if (updatedAsset.getQuantity() * coin.getCurrentPrice() <= 1) {
                    assetService.deleteAsset(updatedAsset.getId());
                }

                return savedOrder;
            }

            throw new Exception("Insufficient Quantity to sell asset.");
        }

        throw new Exception("Asset not found.");
    }

    @Override
    public Order createOrder(User user, OrderItem orderItem, ORDER_TYPE orderType) {
        double price = orderItem.getCoin().getCurrentPrice() * orderItem.getQuantity();

        Order order = new Order();
        order.setUser(user);
        order.setOrderItem(orderItem);
        order.setOrderType(orderType);
        order.setPrice(BigDecimal.valueOf(price));
        order.setTimestamp(LocalDateTime.now());
        order.setStatus(ORDER_STATUS.PENDING);

        return orderRepository.save(order);
    }

    @Override
    public Order getOrderById(Long orderId) throws Exception {
        return orderRepository.findById(orderId).orElseThrow(() -> new Exception("Order not found"));
    }

    @Override
    public List<Order> getAllOrdersOfUser(Long userId, ORDER_TYPE orderType, String assetSymbol) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    @Transactional
    public Order processOrder(Coin coin, double quantity, ORDER_TYPE orderType, User user) throws Exception {
        if (orderType.equals(ORDER_TYPE.BUY)) {
            return buyAsset(coin, quantity, user);
        } else if (orderType.equals(ORDER_TYPE.SELL)) {
            return sellAsset(coin, quantity, user);
        }

        throw new Exception("Invalid Order type");
    }
}
