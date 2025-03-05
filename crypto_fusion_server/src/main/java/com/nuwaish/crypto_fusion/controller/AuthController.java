package com.nuwaish.crypto_fusion.controller;

import com.nuwaish.crypto_fusion.config.JwtProvider;
import com.nuwaish.crypto_fusion.modal.TwoFactorOTP;
import com.nuwaish.crypto_fusion.response.ApiResponse;
import com.nuwaish.crypto_fusion.modal.User;
import com.nuwaish.crypto_fusion.repository.UserRepository;
import com.nuwaish.crypto_fusion.response.AuthResponse;
import com.nuwaish.crypto_fusion.service.CustomUserDetailsService;
import com.nuwaish.crypto_fusion.service.EmailService;
import com.nuwaish.crypto_fusion.service.TwoFactorOTPService;
import com.nuwaish.crypto_fusion.service.WatchListService;
import com.nuwaish.crypto_fusion.utils.OTPUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private TwoFactorOTPService twoFactorOTPService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private WatchListService watchListService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<AuthResponse>> registerUser(@RequestBody User user) {
        try {

            // Validate the incoming user object for required fields
            if (user.getEmail() == null || user.getFullName() == null || user.getPassword() == null) {
                ApiResponse<AuthResponse> response = new ApiResponse<>("Missing required fields", HttpStatus.BAD_REQUEST.value());
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            // Check if the email is already registered
            Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
            if (existingUser.isPresent()) {
                ApiResponse<AuthResponse> response = new ApiResponse<>("Email is already registered", HttpStatus.BAD_REQUEST.value());
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            // save user to database
            User newUser = new User();
            newUser.setEmail(user.getEmail());
            newUser.setFullName(user.getFullName());
            newUser.setPassword(user.getPassword());
            User savedUser = userRepository.save(newUser);

            watchListService.createWatchList(savedUser);

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    user.getEmail(),
                    user.getPassword()
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = JwtProvider.generateToken(authentication);

            // API response with all details
            AuthResponse authResponse = new AuthResponse(savedUser, jwt, true);
            ApiResponse<AuthResponse> response = new ApiResponse<>(authResponse, "User Created Successfully!", HttpStatus.CREATED.value());

            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (Exception e) {
            // Handle any unexpected exceptions
            ApiResponse<AuthResponse> response = new ApiResponse<>("User creation failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> loginUser(@RequestBody User loginRequest) {
        try {
            // Validate input: check if email and password are provided
            if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
                ApiResponse<AuthResponse> response = new ApiResponse<>("Email and Password is required", HttpStatus.BAD_REQUEST.value());
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            // Check if the user exists by email
            Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
            if (userOptional.isEmpty()) {
                ApiResponse<AuthResponse> response = new ApiResponse<>("Email not Registered", HttpStatus.UNAUTHORIZED.value());
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }

            User user = userOptional.get();

            // Verify the password
            if (!user.getPassword().equals(loginRequest.getPassword())) {
                ApiResponse<AuthResponse> response = new ApiResponse<>("Invalid email or password", HttpStatus.UNAUTHORIZED.value());
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }

            Authentication authentication = authenticate(loginRequest.getEmail(), loginRequest.getPassword());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = JwtProvider.generateToken(authentication);

            // if TwoFactor authentication is enabled
            if (user.getTwoFactorAuth().isEnabled()) {
                TwoFactorOTP oldTwoFactorOTP = twoFactorOTPService.findByUser(user.getId());
                if (oldTwoFactorOTP != null) {
                    twoFactorOTPService.deleteTwoFactorOTP(oldTwoFactorOTP);
                }

                String otp = OTPUtils.generateOTP();
                TwoFactorOTP newTwoFactorOTP = twoFactorOTPService.createTwoFactorOTP(user, otp, jwt);
                String session = newTwoFactorOTP.getId();

                // Email service to send otp to email & mobile
                emailService.sendVerificationOTPEmail(user.getEmail(), otp);

                AuthResponse authResponse = new AuthResponse(null, null, true, true, session);
                ApiResponse<AuthResponse> response = new ApiResponse<>(authResponse, "Two Factor Authentication is Enabled!", HttpStatus.OK.value());
                return new ResponseEntity<>(response, HttpStatus.OK);
            }

            AuthResponse authResponse = new AuthResponse(user, jwt, true);
            ApiResponse<AuthResponse> response = new ApiResponse<>(authResponse, "Login Successful", HttpStatus.OK.value());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            // Handle any unexpected exceptions
            ApiResponse<AuthResponse> response = new ApiResponse<>("Login Failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid Username!");
        }

        if (!password.equals(userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid Password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
    }


    @PostMapping("/two-factor/otp/{otp}")
    public ResponseEntity<ApiResponse<AuthResponse>> verifySignInOTP(@PathVariable String otp, @RequestParam String id) {

        TwoFactorOTP twoFactorOTP = twoFactorOTPService.findById(id);

        if (twoFactorOTPService.verifyTwoFactorOTP(twoFactorOTP, otp)) {
            AuthResponse authResponse = new AuthResponse();
            authResponse.setUser(twoFactorOTP.getUser());
            authResponse.setJwt(twoFactorOTP.getJwt());
            authResponse.setTwoFactorAuthEnabled(true);

            ApiResponse<AuthResponse> response = new ApiResponse<>(authResponse, "TwoFactor Authentication Verified, User Login Successfully!", HttpStatus.OK.value());
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        ApiResponse<AuthResponse> response = new ApiResponse<>(null, "Invalid OTP", HttpStatus.UNAUTHORIZED.value());
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
}
