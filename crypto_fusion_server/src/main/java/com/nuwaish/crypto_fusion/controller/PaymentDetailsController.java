package com.nuwaish.crypto_fusion.controller;

import com.nuwaish.crypto_fusion.modal.PaymentDetails;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.response.ApiResponse;
import com.nuwaish.crypto_fusion.service.PaymentDetailsService;
import com.nuwaish.crypto_fusion.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment-details")
public class PaymentDetailsController {

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentDetailsService paymentDetailsService;

    @PostMapping
    public ResponseEntity<ApiResponse<PaymentDetails>> addPaymentDetails(
            @RequestHeader("Authorization") String jwt,
            @RequestBody PaymentDetails paymentDetailsRequest) throws Exception {

        User user = userService.findUserByJwt(jwt);

        PaymentDetails paymentDetails = paymentDetailsService.addPaymentDetails(
                paymentDetailsRequest.getAccountNumber(),
                paymentDetailsRequest.getAccountHolderName(),
                paymentDetailsRequest.getBankName(),
                paymentDetailsRequest.getIfsc(),
                user
        );

        ApiResponse<PaymentDetails> response = new ApiResponse<>();
        response.setData(paymentDetails);
        response.setMessage("User payment details added successfully.");
        response.setStatusCode(HttpStatus.CREATED.value());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PaymentDetails>> getUserPaymentDetails(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwt(jwt);

        PaymentDetails paymentDetails  = paymentDetailsService.getUserPaymentDetails(user);

        ApiResponse<PaymentDetails> response = new ApiResponse<>();
        response.setData(paymentDetails);
        response.setMessage("User payment details fetched successfully.");
        response.setStatusCode(HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
