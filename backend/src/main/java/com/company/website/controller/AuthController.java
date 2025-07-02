package com.company.website.controller;


import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.*;
import java.io.IOException;
import java.util.Map;

import com.company.website.dto.LoginRequest;
import com.company.website.repository.UserRepository;

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

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    private UserService userService;

//    @PostMapping("/register")
//    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
//        // Check if user exists (without revealing which field conflicts)
//        if (userRepository.existsByUsername(user.getUsername()) ||
//                userRepository.existsByEmail(user.getEmail())) {
//
//            return ResponseEntity.status(HttpStatus.CONFLICT)
//                    .body(Map.of(
//                            "status", "error",
//                            "code", "ACCOUNT_EXISTS",
//                            "message", "An account with these details already exists. Please log in."
//                    ));
//        }
//
//        try {
//            UserDto dto = userService.register(user);
//            return ResponseEntity.ok(Map.of(
//                    "status", "success",
//                    "data", dto
//            ));
//        } catch (Exception ex) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body(Map.of(
//                            "status", "error",
//                            "code", "REGISTRATION_FAILED",
//                            "message", "Registration could not be completed. Please try again."
//                    ));
//        }
//    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        // First validate username format if needed
        if (!isValidUsername(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of(
                            "status", "error",
                            "code", "INVALID_USERNAME",
                            "message", "Username must be 4-20 characters and contain only letters and numbers"
                    ));
        }

        // Check for existing email (only show email exists message)
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of(
                            "status", "error",
                            "code", "EMAIL_EXISTS",
                            "message", "This email is already registered. Please log in or use a different email."
                    ));
        }

        // Check for username availability (but don't treat as error if duplicates are allowed)
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.OK) // Not an error status
                    .body(Map.of(
                            "status", "info",
                            "code", "USERNAME_TAKEN",
                            "message", "This username is taken. Please enter another user name."
                    ));
        }

        try {
            UserDto dto = userService.register(user);
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "data", dto
            ));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of(
                            "status", "error",
                            "code", "REGISTRATION_FAILED",
                            "message", "Registration failed: " + ex.getMessage()
                    ));
        }
    }

    private boolean isValidUsername(String username) {
        // Example validation - adjust per your requirements
        return username != null && username.matches("^[a-zA-Z0-9]{4,20}$");
    }


    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody LoginRequest request) {
        UserDto dto = userService.login(request);
        return ResponseEntity.ok(new Response("Login successful", dto));
    }

    @GetMapping("/profile/{username}")
    public ResponseEntity<Response> getProfile(@PathVariable String username) {
        UserDto dto = userService.getProfile(username);
        return ResponseEntity.ok(new Response("Profile fetched", dto));
    }

//    @PostMapping("/profile/{username}/upload-image")
//    public ResponseEntity<?> uploadProfileImage(@PathVariable String username, @RequestParam("image") MultipartFile file) {
//        if (file.isEmpty()) {
//            return ResponseEntity.badRequest().body("Image is empty");
//        }
//
//        try {
//            System.out.println("Username in path variable: " + username);
//            String uploadDir = "uploads/";
//            String filename = username + "_" + file.getOriginalFilename();
//
//            // Ensure uploads directory exists
//            File directory = new File(uploadDir);
//            if (!directory.exists()) {
//                directory.mkdirs();
//            }
//
//            Path filepath = Paths.get(uploadDir, filename);
//            Files.copy(file.getInputStream(), filepath, StandardCopyOption.REPLACE_EXISTING);
//
//            // ✅ FIXED: get user correctly
//            User user = userRepository.findByUsername(username)
//                    .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
//
//            // Save path relative to static access
//            user.setProfileImage("uploads/" + filename);
//            userRepository.save(user);
//
//            return ResponseEntity.ok(Map.of("message", "Success", "data", user));
//
//        } catch (IOException e) {
//            return ResponseEntity.status(500).body("Failed to upload image");
//        }
//    }

    @PostMapping("/profile/{username}/upload-image")
    public ResponseEntity<?> uploadProfileImage(
            @PathVariable String username,
            @RequestParam("image") MultipartFile file
    ) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Image is empty");
        }

        try {
            String uploadDir = "uploads/";
            String filename = username + "_" + file.getOriginalFilename(); // e.g., "qqq_mechanical.jpeg"

            // Ensure uploads directory exists
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Save file to disk
            Path filepath = Paths.get(uploadDir, filename);
            Files.copy(file.getInputStream(), filepath, StandardCopyOption.REPLACE_EXISTING);

            // Update user's profileImage (store ONLY filename)
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            user.setProfileImage(filename); // ✅ Store "qqq_mechanical.jpeg", not "uploads/qqq_mechanical.jpeg"
            userRepository.save(user);

            return ResponseEntity.ok(Map.of(
                    "message", "Image uploaded successfully",
                    "data", EntityDtoMapper.toDto(user)
            ));

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload image");
        }
    }
}
