package com.nuwaish.crypto_fusion.modal;

import com.nuwaish.crypto_fusion.domain.WITHDRAWAL_STATUS;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Withdrawal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private WITHDRAWAL_STATUS status;

    private Long amount;

    @ManyToOne
    private User user;

    private LocalDateTime date=LocalDateTime.now();
}
