package com.nuwaish.crypto_fusion.request;

import com.nuwaish.crypto_fusion.domain.ORDER_TYPE;
import lombok.Data;

@Data
public class CreateOrderRequest {
    private String coinId;
    private double quantity;
    private ORDER_TYPE orderType;
}
