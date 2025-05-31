package com.company.website.controller;

import com.company.website.dto.Response;
import com.company.website.dto.UserDto;
import com.company.website.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3002")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile/{username}")
    public Response getProfile(@PathVariable String username) {
        UserDto dto = userService.getProfile(username);
        return new Response("Profile fetched", dto);
    }
}
