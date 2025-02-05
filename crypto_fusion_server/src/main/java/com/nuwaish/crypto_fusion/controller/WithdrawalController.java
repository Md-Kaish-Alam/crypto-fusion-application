package com.nuwaish.crypto_fusion.controller;

import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.modal.Wallet;
import com.nuwaish.crypto_fusion.modal.Withdrawal;
import com.nuwaish.crypto_fusion.response.ApiResponse;
import com.nuwaish.crypto_fusion.service.UserService;
import com.nuwaish.crypto_fusion.service.WalletService;
import com.nuwaish.crypto_fusion.service.WithdrawalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class WithdrawalController {

    @Autowired
    private UserService userService;

    @Autowired
    private WithdrawalService withdrawalService;

    @Autowired
    private WalletService walletService;

//    @Autowired
//    private WalletTransactionService walletTransactionService;

    @PostMapping("/api/withdrawal/{amount}")
    public ResponseEntity<ApiResponse<Withdrawal>> withdrawalRequest(
            @PathVariable Long amount,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserByJwt(jwt);

        Wallet userWallet = walletService.getUserWallet(user);

        Withdrawal withdrawal = withdrawalService.requestWithdrawal(amount, user);
        walletService.addBalanceToWallet(userWallet, -withdrawal.getAmount());

        // Wallet Transaction

        ApiResponse<Withdrawal> response = new ApiResponse<>();
        response.setData(withdrawal);
        response.setMessage("Wallet Withdrawal Successfully");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/api/admin/withdrawal/{id}/proceed/{accept}")
    public ResponseEntity<ApiResponse<Withdrawal>> proceedWithdrawal(
            @PathVariable Long id,
            @PathVariable boolean accept,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserByJwt(jwt);

        Withdrawal withdrawal = withdrawalService.proceedWithdrawal(id, accept);

        Wallet userWallet = walletService.getUserWallet(user);

        if (!accept) {
            walletService.addBalanceToWallet(userWallet, withdrawal.getAmount());
        }

        ApiResponse<Withdrawal> response = new ApiResponse<>();
        response.setData(withdrawal);
        response.setMessage("Withdrawal Completed.");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/api/withdrawal")
    public ResponseEntity<ApiResponse<List<Withdrawal>>> getWithdrawalHistory(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserByJwt(jwt);

        List<Withdrawal> withdrawals = withdrawalService.getUserWithdrawalHistory(user);

        ApiResponse<List<Withdrawal>> response = new ApiResponse<>();
        response.setData(withdrawals);
        response.setMessage("Users Withdrawal details fetched successfully.");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/api/admin/withdrawal")
    public ResponseEntity<ApiResponse<List<Withdrawal>>> getAllWithdrawalRequest(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserByJwt(jwt);

        if (user == null) {
            throw new Exception("Unauthorised");
        }

        List<Withdrawal> withdrawals = withdrawalService.getAllWithdrawalRequest();

        ApiResponse<List<Withdrawal>> response = new ApiResponse<>();
        response.setData(withdrawals);
        response.setMessage("Withdrawals details fetched successful.");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
