package com.company.website.controller;


import org.springframework.web.multipart.MultipartFile;
import java.nio.file.*;
import java.io.IOException;

import com.company.website.dto.LoginRequest;
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

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody User user) {
        try {
            UserDto dto = userService.register(user);
            return ResponseEntity.ok(new Response("Registration successful", dto));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new Response("Error", ex.getMessage())); // ✅ so frontend can display it
        }

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

    @PostMapping("/profile/{username}/upload-image")
    public ResponseEntity<Response> uploadProfileImage(
            @PathVariable String username,
            @RequestParam("image") MultipartFile file) {
        try {
            // Create a directory to store uploaded images
            String uploadDir = "uploads/";
            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Unique filename: username + original filename
            String fileName = username + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            // Save file
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Save relative path (for frontend usage)
            String imagePath = uploadDir + fileName;

            // Update DB with new image path
            User updatedUser = userService.updateProfileImage(username, imagePath);

            return ResponseEntity.ok(new Response("Image uploaded", EntityDtoMapper.toDto(updatedUser)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response("Failed to upload image", e.getMessage()));
        }
    }
}
