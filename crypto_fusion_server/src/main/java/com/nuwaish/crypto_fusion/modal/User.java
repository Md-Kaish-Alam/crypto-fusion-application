package com.nuwaish.crypto_fusion.modal;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nuwaish.crypto_fusion.domain.USER_ROLE;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "app_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String fullName;
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Embedded
    private TwoFactorAuth twoFactorAuth= new TwoFactorAuth();

    private USER_ROLE role=USER_ROLE.ROLE_CUSTOMER;

    private LocalDate dateOfBirth;
    private String nationality;
    private String address;
    private String city;
    private String pincode;
    private String country;
}
