package com.nuwaish.crypto_fusion.modal;


import com.nuwaish.crypto_fusion.domain.VERIFICATION_TYPE;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
public class ForgotPasswordToken {

    @Id
    private UUID id;

    @OneToOne
    private User user;

    private String otp;

    private VERIFICATION_TYPE verificationType;

    private String sendTo;


}
