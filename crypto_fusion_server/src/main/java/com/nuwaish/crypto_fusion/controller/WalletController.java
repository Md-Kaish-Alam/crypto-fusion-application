package com.nuwaish.crypto_fusion.controller;

import com.nuwaish.crypto_fusion.modal.*;
import com.nuwaish.crypto_fusion.response.ApiResponse;
import com.nuwaish.crypto_fusion.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentOrderService paymentOrderService;

    @Autowired
    private WalletTransactionService walletTransactionService;

    @GetMapping
    public ResponseEntity<ApiResponse<Wallet>> getUserWallet(
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Wallet wallet = walletService.getUserWallet(user);

        ApiResponse<Wallet> response = new ApiResponse<>();
        response.setData(wallet);
        response.setMessage("User's Wallet fetched successfully!");
        response.setStatusCode(HttpStatus.ACCEPTED.value());

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @GetMapping("/transactions")
    public ResponseEntity<ApiResponse<List<WalletTransaction>>> getUserWalletTransactions(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user=userService.findUserByJwt(jwt);

        Wallet wallet = walletService.getUserWallet(user);

        List<WalletTransaction> transactions=walletTransactionService.getTransactions(wallet,null);

        ApiResponse<List<WalletTransaction>> response = new ApiResponse<>();
        response.setData(transactions);
        response.setMessage("User's Wallet Transactions fetched successfully.");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{walletId}/transfer")
    public ResponseEntity<ApiResponse<Wallet>> walletToWalletTransfer(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long walletId,
            @RequestBody WalletTransaction walletTransaction) throws Exception {

        User senderUser = userService.findUserByJwt(jwt);
        Wallet receiverWallet = walletService.findWalletById(walletId);
        Wallet wallet = walletService.walletToWalletTransfer(
                senderUser,
                receiverWallet,
                walletTransaction.getAmount());

        ApiResponse<Wallet> response = new ApiResponse<>();
        response.setData(wallet);
        response.setMessage(("Transfer Successful!"));
        response.setStatusCode(HttpStatus.ACCEPTED.value());

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PutMapping("/order/{orderId}/pay")
    public ResponseEntity<ApiResponse<Wallet>> payOrderPayment(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long orderId) throws Exception {

        User user = userService.findUserByJwt(jwt);
        Order order = orderService.getOrderById(orderId);

        Wallet wallet = walletService.payOrderPayment(order, user);

        ApiResponse<Wallet> response = new ApiResponse<>();
        response.setData(wallet);
        response.setMessage(("Order Payment Successful."));
        response.setStatusCode(HttpStatus.ACCEPTED.value());

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PutMapping("/deposit")
    public ResponseEntity<ApiResponse<Wallet>> addBalanceToWallet(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(name = "order_id") Long orderId,
            @RequestParam(name = "payment_id") String paymentId) throws Exception {

        User user = userService.findUserByJwt(jwt);

        Wallet wallet = walletService.getUserWallet(user);

        PaymentOrder paymentOrder = paymentOrderService.getPaymentOrderById(orderId);

        boolean status = paymentOrderService.proceedPaymentOrder(paymentOrder, paymentId);

        if (status) {
            if (wallet.getBalance() == null) {
                wallet.setBalance(BigDecimal.valueOf(0));
            }
            wallet = walletService.addBalanceToWallet(wallet, paymentOrder.getAmount());
        }

        ApiResponse<Wallet> response = new ApiResponse<>();
        response.setData(wallet);
        response.setMessage(("Deposit Successful."));
        response.setStatusCode(HttpStatus.ACCEPTED.value());

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}
