package com.company.website.mapper;

import com.company.website.dto.UserDto;
import com.company.website.entity.User;

public class EntityDtoMapper {

    public static UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        return dto;
    }
}
