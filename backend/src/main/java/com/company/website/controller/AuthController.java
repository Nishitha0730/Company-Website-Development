package com.company.website.controller;

import jakarta.validation.Valid;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.nio.file.*;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import java.util.Date;

import com.company.website.dto.LoginRequest;
import com.company.website.repository.UserRepository;
import com.company.website.service.EmailService;
import com.company.website.dto.Response;
import com.company.website.dto.UserDto;
import com.company.website.entity.User;
import com.company.website.mapper.EntityDtoMapper;
import com.company.website.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final EmailService emailService;

    @Autowired
    public AuthController(UserRepository userRepository,
                          UserService userService,
                          EmailService emailService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(ErrorResponse.of(
                            "EMAIL_EXISTS",
                            "This email is already registered. Please log in or use a different email."
                    ));
        }

        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(ErrorResponse.of(
                            "USERNAME_TAKEN",
                            "Username is already taken. Please choose another one."
                    ));
        }

        try {
            // Generate verification token and set expiry date
            String verificationToken = UUID.randomUUID().toString();
            Date expiryDate = new Date(System.currentTimeMillis() + (24 * 60 * 60 * 1000)); // 24 hours

            // Register user with verification token
            UserDto dto = userService.register(user, verificationToken, expiryDate);

            // Send verification email
            String verificationLink = "http://localhost:3000/verify-email?token=" + verificationToken;
            emailService.sendVerificationEmail(user.getEmail(), verificationLink);

            return ResponseEntity.ok(SuccessResponse.of(
                    Map.of(
                            "user", dto,
                            "message", "Registration successful! Please check your email to verify your account."
                    )
            ));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ErrorResponse.of(
                            "REGISTRATION_FAILED",
                            "Registration failed: " + ex.getMessage()
                    ));
        }
    }

    @GetMapping("/verify-email")
    public ResponseEntity<Map<String, Object>> verifyEmail(@RequestParam String token) {
        try {
            UserDto verifiedUser = userService.verifyEmail(token);
            return ResponseEntity.ok(SuccessResponse.of(
                    Map.of(
                            "user", verifiedUser,
                            "message", "Email verified successfully! You can now login.",
                            "redirect", true  // Add this flag
                    )
            ));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ErrorResponse.of(
                            "VERIFICATION_FAILED",
                            ex.getMessage()
                    ));
        }
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<Map<String, Object>> resendVerification(@RequestParam String email) {
        try {
            // Generate new token and expiry
            String newToken = UUID.randomUUID().toString();
            Date newExpiry = new Date(System.currentTimeMillis() + (24 * 60 * 60 * 1000));

            userService.updateVerificationToken(email, newToken, newExpiry);

            // Send new verification email
            String verificationLink = "http://localhost:3000/verify-email?token=" + newToken;
            emailService.sendVerificationEmail(email, verificationLink);

            return ResponseEntity.ok(SuccessResponse.of(
                    Map.of(
                            "message", "Verification email resent successfully!"
                    )
            ));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ErrorResponse.of(
                            "RESEND_FAILED",
                            ex.getMessage()
                    ));
        }
    }

    // ... rest of your existing methods (login, profile, upload-image) remain the same ...

    public class ErrorResponse {
        public static Map<String, Object> of(String code, String message) {
            return Map.of(
                    "status", "error",
                    "code", code,
                    "message", message
            );
        }
    }

    public class SuccessResponse {
        public static Map<String, Object> of(Object data) {
            return Map.of(
                    "status", "success",
                    "data", data
            );
        }
    }
}