package com.nuwaish.crypto_fusion.controller;

import com.nuwaish.crypto_fusion.domain.PAYMENT_METHOD;
import com.nuwaish.crypto_fusion.modal.PaymentOrder;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.response.PaymentResponse;
import com.nuwaish.crypto_fusion.service.PaymentOrderService;
import com.nuwaish.crypto_fusion.service.UserService;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentOrderController {

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentOrderService paymentOrderService;

    @PostMapping("/{paymentMethod}/amount/{amount}")
    public ResponseEntity<PaymentResponse> paymentHandler(
            @RequestHeader("Authorization") String jwt,
            @PathVariable PAYMENT_METHOD paymentMethod,
            @PathVariable Long amount) throws Exception {

        User user = userService.findUserByJwt(jwt);

        PaymentResponse paymentResponse = new PaymentResponse();

        PaymentOrder paymentOrder = paymentOrderService.createOrder(user, amount, paymentMethod);

        if (paymentMethod.equals(PAYMENT_METHOD.RAZORPAY)) {
            paymentResponse = paymentOrderService.createRazorpayPaymentLink(user, amount);
        } else if (paymentMethod.equals(PAYMENT_METHOD.STRIPE)) {
            paymentResponse = paymentOrderService.createStripePaymentLink(user, amount, paymentOrder.getId());
        }

        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
    }
}
