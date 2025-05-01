package com.nuwaish.crypto_fusion.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.apache.commons.text.StringSubstitutor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendVerificationOTPEmail(String email, String otp) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, "UTF-8");

        try {
            String htmlContent = loadHtmlTemplate("otp-verification-template.html", otp);

            mimeMessageHelper.setTo(email);
            mimeMessageHelper.setSubject("CryptoFusion Email Verification");
            mimeMessageHelper.setFrom(fromEmail);
            mimeMessageHelper.setText(htmlContent, true); // true for HTML

            javaMailSender.send(mimeMessage);

        } catch (IOException | MailException e) {
            throw new MailSendException("Failed to send verification email: " + e.getMessage(), e);
        }
    }

    public void sendForgotPasswordOTPEmail(String email, String otp) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, "UTF-8");

        try {
            String htmlContent = loadHtmlTemplate("forgot-password-otp-template.html", otp);

            mimeMessageHelper.setTo(email);
            mimeMessageHelper.setSubject("CryptoFusion Password Reset OTP");
            mimeMessageHelper.setFrom(new InternetAddress(fromEmail, "CryptoFusion Support"));
            mimeMessageHelper.setText(htmlContent, true); // HTML content

            javaMailSender.send(mimeMessage);

        } catch (IOException | MailException e) {
            throw new MailSendException("Failed to send forgot password email: " + e.getMessage(), e);
        }
    }


    private String loadHtmlTemplate(String templateFileName, String otp) throws IOException {
        ClassPathResource resource = new ClassPathResource("templates/" + templateFileName);
        byte[] bytes = resource.getInputStream().readAllBytes();
        String template = new String(bytes, StandardCharsets.UTF_8);

        Map<String, String> values = new HashMap<>();
        values.put("OTP", otp);

        return StringSubstitutor.replace(template, values, "{{", "}}");
    }

}

