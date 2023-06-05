package com.saulius.restaurant.mapper;

import com.saulius.restaurant.model.User;
import com.saulius.restaurant.rest.dto.UserDto;

public class UserMapper {

    public static UserDto userToUserDto (User userToConvert) {
        return new UserDto(
                userToConvert.getId(),
                userToConvert.getUsername(),
                userToConvert.getPassword(),
                userToConvert.getName(),
                userToConvert.getEmail(),
                userToConvert.getRole()
                );
    }
}
