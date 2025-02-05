package com.nuwaish.crypto_fusion.modal;

import com.nuwaish.crypto_fusion.domain.PAYMENT_METHOD;
import com.nuwaish.crypto_fusion.domain.PAYMENT_ORDER_STATUS;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PaymentOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long amount;

    private PAYMENT_ORDER_STATUS status;

    private PAYMENT_METHOD paymentMethod;

    @ManyToOne
    private User user;

}
