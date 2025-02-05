package com.nuwaish.crypto_fusion.request;

import com.nuwaish.crypto_fusion.domain.VERIFICATION_TYPE;
import lombok.Data;

@Data
public class ForgotPasswordTokenRequest {
    private VERIFICATION_TYPE verificationType;
    private String sendTo;
}
