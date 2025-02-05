package com.nuwaish.crypto_fusion.response;

import com.nuwaish.crypto_fusion.modal.User;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthResponse {

    private User user;
    private String jwt;
    private boolean status;
    private boolean isTwoFactorAuthEnabled;
    private String session;

    public AuthResponse() {

    }

    public AuthResponse(User user) {
        this.user = user;
    }

    public AuthResponse(User user, String jwt) {
        this.user = user;
        this.jwt = jwt;
    }

    public AuthResponse(User user, String jwt, boolean status) {
        this.user = user;
        this.jwt = jwt;
        this.status = status;
    }

    public AuthResponse(User user, String jwt, boolean status, boolean isTwoFactorAuthEnabled) {
        this.user = user;
        this.jwt = jwt;
        this.status = status;
        this.isTwoFactorAuthEnabled = isTwoFactorAuthEnabled;
    }

    public AuthResponse(User user, String jwt, boolean status, boolean isTwoFactorAuthEnabled, String session) {
        this.user = user;
        this.jwt = jwt;
        this.status = status;
        this.isTwoFactorAuthEnabled = isTwoFactorAuthEnabled;
        this.session = session;
    }
}
