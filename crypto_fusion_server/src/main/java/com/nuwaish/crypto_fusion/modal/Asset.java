package com.nuwaish.crypto_fusion.modal;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private double quantity;

    private double buyPrice;

    private double sellPrice;

    @ManyToOne
    private Coin coin;

    @ManyToOne
    private User user;
}
