package com.nuwaish.crypto_fusion.controller;

import com.nuwaish.crypto_fusion.domain.VERIFICATION_TYPE;
import com.nuwaish.crypto_fusion.modal.ForgotPasswordToken;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.modal.VerificationCode;
import com.nuwaish.crypto_fusion.request.ForgotPasswordTokenRequest;
import com.nuwaish.crypto_fusion.request.ResetPasswordRequest;
import com.nuwaish.crypto_fusion.request.UserDetailsRequest;
import com.nuwaish.crypto_fusion.response.ApiResponse;
import com.nuwaish.crypto_fusion.response.AuthResponse;
import com.nuwaish.crypto_fusion.service.EmailService;
import com.nuwaish.crypto_fusion.service.ForgotPasswordService;
import com.nuwaish.crypto_fusion.service.UserService;
import com.nuwaish.crypto_fusion.service.VerificationCodeService;
import com.nuwaish.crypto_fusion.utils.OTPUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @GetMapping("/api/users/profile")
    public ResponseEntity<ApiResponse<User>> getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);

        ApiResponse<User> response = new ApiResponse<>(user, HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/api/users/{userId}")
    public ResponseEntity<ApiResponse<User>> getUserById(@RequestHeader("Authorization") String jwt,
                                                         @PathVariable Long userId) throws Exception {

        User user = userService.findUserById(userId);

        ApiResponse<User> response = new ApiResponse<>(user, HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/api/users/profile/update-details")
    public ResponseEntity<ApiResponse<User>> updateUserDetails(
            @RequestHeader("Authorization") String jwt,
            @RequestBody UserDetailsRequest request) throws Exception {

        User user = userService.findUserByJwt(jwt);
        User updatedUser = userService.updateUserDetails(user, request);

        ApiResponse<User> response = new ApiResponse<>(updatedUser, "User details updated successfully!", HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/api/users/verification/{verificationType}/send-otp")
    public ResponseEntity<ApiResponse<String>> sendVerificationOtp(
            @RequestHeader("Authorization") String jwt,
            @PathVariable VERIFICATION_TYPE verificationType) throws Exception {
        User user = userService.findUserByJwt(jwt);

        VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());

        if (verificationCode == null) {
            verificationCode = verificationCodeService.sendVerificationCode(user, verificationType);
        }

        if (verificationType.equals(VERIFICATION_TYPE.EMAIL)) {
            emailService.sendVerificationOTPEmail(user.getEmail(), verificationCode.getOtp());
        }

        ApiResponse<String> response = new ApiResponse<>("Verification OTP sent successfully!", HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/api/users/enable-two-factor/verify-otp/{otp}")
    public ResponseEntity<ApiResponse<User>> enableTwoFactorAuthentication(
            @RequestHeader("Authorization") String jwt, @PathVariable String otp) throws Exception {
        User user = userService.findUserByJwt(jwt);

        VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());

        String sendTo = verificationCode.getVerificationType().equals(VERIFICATION_TYPE.EMAIL) ?
                verificationCode.getEmail() : verificationCode.getMobile();

        boolean isVerified = verificationCode.getOtp().equals(otp);

        if (isVerified) {
            User updatedUser = userService.enableTwoFactorAuthentication(
                    verificationCode.getVerificationType(), sendTo, user);

            verificationCodeService.deleteVerificationCodeById(verificationCode);

            ApiResponse<User> response = new ApiResponse<>(user, HttpStatus.OK.value());
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        throw new Exception("Wrong OTP");
    }

    @PostMapping("/auth/users/reset-password/send-otp")
    public ResponseEntity<ApiResponse<AuthResponse>> sendForgotPasswordOTP(
            @RequestBody ForgotPasswordTokenRequest request) throws Exception {

        User user = userService.findUserByEmail(request.getSendTo());

        String otp = OTPUtils.generateOTP();
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();

        ForgotPasswordToken token = forgotPasswordService.findTokenByUser(user.getId());

        if (token == null) {
            token = forgotPasswordService.createToken(user, id, otp, request.getVerificationType(), request.getSendTo());
        }

        if (request.getVerificationType().equals(VERIFICATION_TYPE.EMAIL)) {
            emailService.sendVerificationOTPEmail(user.getEmail(), token.getOtp());
        }

        AuthResponse authResponse = new AuthResponse();
        authResponse.setSession(token.getId());
        ApiResponse<AuthResponse> response = new ApiResponse<>(authResponse,"Forgot Password OTP sent successfully!", HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PatchMapping("/auth/users/reset-password/verify-otp")
    public ResponseEntity<ApiResponse<String>> resetPassword(
            @RequestParam String id,
            @RequestHeader("Authorization") String jwt,
            @RequestBody ResetPasswordRequest request) throws Exception {

        ForgotPasswordToken forgotPasswordToken = forgotPasswordService.findTokenById(id);

        boolean isVerified = forgotPasswordToken.getOtp().equals(request.getOtp());

        if (isVerified) {
            userService.updatePassword(forgotPasswordToken.getUser(), request.getPassword());

            ApiResponse<String> response = new ApiResponse<>();
            response.setMessage("Password Updated Successfully!");

            return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
        }
        
        throw new Exception("Wrong OTP");
    }
}
