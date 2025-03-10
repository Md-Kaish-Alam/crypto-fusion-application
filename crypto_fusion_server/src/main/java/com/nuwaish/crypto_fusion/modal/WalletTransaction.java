package com.nuwaish.crypto_fusion.modal;

import com.nuwaish.crypto_fusion.domain.WALLET_TRANSACTION_TYPE;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class WalletTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Wallet wallet;

    private WALLET_TRANSACTION_TYPE type;

    private LocalDate date;

    private String transferId;

    private String purpose;

    private Long amount;
}
