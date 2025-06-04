package com.company.website.controller;

import com.company.website.dto.LoginRequest;
import com.company.website.dto.Response;
import com.company.website.dto.UserDto;
import com.company.website.entity.User;
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
}
