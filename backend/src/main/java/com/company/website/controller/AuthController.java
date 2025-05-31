package com.company.website.controller;

import com.company.website.dto.LoginRequest;
import com.company.website.dto.Response;
import com.company.website.dto.UserDto;
import com.company.website.entity.User;
import com.company.website.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3002")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Response register(@RequestBody User user) {
        UserDto dto = userService.register(user);
        return new Response("User registered", dto);
    }

    @PostMapping("/login")
    public Response login(@RequestBody LoginRequest request) {
        UserDto dto = userService.login(request);
        return new Response("Login successful", dto);
    }
}
