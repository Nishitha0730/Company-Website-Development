package com.company.website.service;

import com.company.website.dto.LoginRequest;
import com.company.website.dto.UserDto;
import com.company.website.entity.User;
import com.company.website.exception.InvalidCredentialsException;
import com.company.website.mapper.EntityDtoMapper;
import com.company.website.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public UserDto register(User user) {
        user.setRole("USER");
        userRepo.save(user);
        return EntityDtoMapper.toDto(user);
    }

    public UserDto login(LoginRequest loginRequest) {
        User user = userRepo.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new InvalidCredentialsException("User not found"));

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new InvalidCredentialsException("Incorrect password");
        }

        return EntityDtoMapper.toDto(user);
    }

    public UserDto getProfile(String username) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return EntityDtoMapper.toDto(user);
    }
}
