package com.nuwaish.crypto_fusion.modal;

import com.nuwaish.crypto_fusion.domain.VERIFICATION_TYPE;
import lombok.Data;

@Data
public class TwoFactorAuth {

    private boolean isEnabled = false;
    private VERIFICATION_TYPE sendTo;
}
