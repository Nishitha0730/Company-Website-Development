package com.company.website.service;

import com.company.website.dto.LoginRequest;
import com.company.website.dto.UserDto;
import com.company.website.entity.User;
import com.company.website.exception.InvalidCredentialsException;
import com.company.website.exception.VerificationException;
import com.company.website.mapper.EntityDtoMapper;
import com.company.website.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserDto register(User user, String verificationToken, Date expiryDate) {
        // Check if user already exists
        if (userRepo.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Set user properties
        user.setRole("USER");
        user.setPassword(encoder.encode(user.getPassword()));
        user.setVerified(false);
        user.setVerificationToken(verificationToken);
        user.setVerificationTokenExpiry(expiryDate);

        // Set default profile image if not provided
        if (user.getProfileImage() == null || user.getProfileImage().isEmpty()) {
            user.setProfileImage("/default_profile_image.png");
        }

        // Save and return
        User savedUser = userRepo.save(user);
        return EntityDtoMapper.toDto(savedUser);
    }

    public UserDto verifyEmail(String token) throws VerificationException {
        User user = userRepo.findByVerificationToken(token)
                .orElseThrow(() -> new VerificationException("Invalid verification token"));

        // Check if token is expired
        if (user.getVerificationTokenExpiry().before(new Date())) {
            throw new VerificationException("Verification token has expired");
        }

        // Mark as verified and clear token
        user.setVerified(true);
        user.setVerificationToken(null);
        user.setVerificationTokenExpiry(null);
        userRepo.save(user);

        return EntityDtoMapper.toDto(user);
    }

    public void updateVerificationToken(String email, String token, Date expiryDate) throws VerificationException {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new VerificationException("User not found with email: " + email));

        user.setVerificationToken(token);
        user.setVerificationTokenExpiry(expiryDate);
        userRepo.save(user);
    }

    public UserDto login(LoginRequest loginRequest) {
        User user = userRepo.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new InvalidCredentialsException("User not found"));

        // Check password
        if (!encoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Incorrect password");
        }

        // Check if email is verified
        if (!user.isVerified()) {
            throw new InvalidCredentialsException("Email not verified. Please check your email for verification link.");
        }

        return EntityDtoMapper.toDto(user);
    }

    public UserDto getProfile(String username) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return EntityDtoMapper.toDto(user);
    }

    public User updateProfileImage(String username, String imageUrl) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setProfileImage(imageUrl);
        return userRepo.save(user);
    }
}