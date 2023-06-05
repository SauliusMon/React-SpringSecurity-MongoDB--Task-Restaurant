package com.saulius.restaurant.service;

import com.saulius.restaurant.model.User;
import com.saulius.restaurant.rest.dto.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<UserDto> getUsers();

    List<UserDto> getUsersByUsernameFilter(String username);

    User getUserByUsername(String username);

    boolean hasUserWithUsername(String username);

    boolean hasUserWithEmail(String email);

    User validateAndGetUserByUsername(String username);

    User saveUser(User user);

    void deleteUser(User user);
}
