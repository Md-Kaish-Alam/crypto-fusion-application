package com.nuwaish.crypto_fusion.service;

import com.nuwaish.crypto_fusion.domain.PAYMENT_METHOD;
import com.nuwaish.crypto_fusion.modal.PaymentOrder;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.response.PaymentResponse;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

public interface PaymentOrderService {

    PaymentOrder createOrder(User user, Long amount, PAYMENT_METHOD paymentMethod);

    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentOrderId) throws RazorpayException;

    PaymentResponse createRazorpayPaymentLink(User user, Long amount);

    PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException;
}
