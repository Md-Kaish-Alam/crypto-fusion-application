package com.nuwaish.crypto_fusion.service.impl;

import com.nuwaish.crypto_fusion.domain.PAYMENT_METHOD;
import com.nuwaish.crypto_fusion.domain.PAYMENT_ORDER_STATUS;
import com.nuwaish.crypto_fusion.modal.PaymentOrder;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.repository.PaymentOrderRepository;
import com.nuwaish.crypto_fusion.response.PaymentResponse;
import com.nuwaish.crypto_fusion.service.PaymentOrderService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.jetbrains.annotations.NotNull;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentOrderServiceImpl implements PaymentOrderService {

    @Autowired
    private PaymentOrderRepository paymentOrderRepository;

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Value("${razorpay.api.key}")
    private String razorpayApiKey;

    @Value("${razorpay.api.secret.key}")
    private String razorpaySecretKey;

    @Override
    public PaymentOrder createOrder(User user, Long amount, PAYMENT_METHOD paymentMethod) {

        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setUser(user);
        paymentOrder.setAmount(amount);
        paymentOrder.setPaymentMethod(paymentMethod);
        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long id) throws Exception {
        return paymentOrderRepository.findById(id).orElseThrow(
                () -> new Exception("Payment Order not found!"));
    }

    @Override
    public boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentOrderId) throws RazorpayException {

        if (paymentOrder.getStatus().equals(PAYMENT_ORDER_STATUS.PENDING)) {
            if (paymentOrder.getPaymentMethod().equals(PAYMENT_METHOD.RAZORPAY)) {
                RazorpayClient razorpayClient = new RazorpayClient(razorpayApiKey, razorpaySecretKey);
                Payment payment = razorpayClient.payments.fetch(paymentOrderId);

                Integer amount = payment.get("amount");
                String status = payment.get("status");

                if (status.equals("captured")) {
                    paymentOrder.setStatus(PAYMENT_ORDER_STATUS.SUCCESS);
                    paymentOrder.setAmount(Long.valueOf(amount));
                    paymentOrderRepository.save(paymentOrder);
                    return true;
                }

                paymentOrder.setStatus(PAYMENT_ORDER_STATUS.FAILED);
                paymentOrderRepository.save(paymentOrder);
                return false;
            }

            paymentOrder.setStatus(PAYMENT_ORDER_STATUS.SUCCESS);
            paymentOrderRepository.save(paymentOrder);
            return true;
        }
        return false;
    }

    private static @NotNull JSONObject getPaymentLinkRequestJsonObject(User user, Long amount) {
        JSONObject paymentLinkRequest = new JSONObject();
        paymentLinkRequest.put("amount", amount);
        paymentLinkRequest.put("currency", "INR");

        // Create a JSON object with the customer details
        JSONObject customer = new JSONObject();
        customer.put("name", user.getFullName());
        customer.put("email", user.getEmail());

        paymentLinkRequest.put("customer", customer);

        // Create a JSON object with the notification settings
        JSONObject notify = new JSONObject();
        notify.put("email", true);

        paymentLinkRequest.put("notify", notify);

        // set the reminder settings
        paymentLinkRequest.put("reminder_enable", true);

        // set the callback URL and method
        paymentLinkRequest.put("callback_url", "http://localhost:5173/wallet");
        paymentLinkRequest.put("callback_method", "get");
        return paymentLinkRequest;
    }

    @Override
    public PaymentResponse createRazorpayPaymentLink(User user, Long amount) {

        try {
            // Instantiate a razorpay client with your key ID and Secret
            RazorpayClient razorpayClient = new RazorpayClient(razorpayApiKey, razorpaySecretKey);

            // Create a JSON object with the payment link request parameters
            JSONObject paymentLinkRequest = getPaymentLinkRequestJsonObject(user, amount*100);

            // create the payment link using the payment.create() method
            PaymentLink paymentLink = razorpayClient.paymentLink.create(paymentLinkRequest);

            String paymentLinkId = paymentLink.get("id");
            String paymentLinkUrl = paymentLink.get("short_url");

            PaymentResponse response = new PaymentResponse();
            response.setPaymentUrl(paymentLinkUrl);

            return response;

        } catch (RazorpayException e) {
            System.out.println("Error on creating payment link: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException {

        Stripe.apiKey = stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/wallet?order_id="+orderId)
                .setCancelUrl("http://localhost:5173/payment/cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount(amount*100)
                                .setProductData(SessionCreateParams
                                        .LineItem
                                        .PriceData
                                        .ProductData
                                        .builder()
                                        .setName("Top up wallet")
                                        .build()
                                ).build()
                        ).build()
                ).build();

        Session session = Session.create(params);

        System.out.println("stripe session : " + session);

        PaymentResponse response = new PaymentResponse();
        response.setPaymentUrl(session.getUrl());

        return response;
    }
}
