package com.nuwaish.crypto_fusion.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserDetailsRequest {
    private LocalDate dateOfBirth;
    private String nationality;
    private String address;
    private String city;
    private String pincode;
    private String country;
}
