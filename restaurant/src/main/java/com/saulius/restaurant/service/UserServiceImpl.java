package com.saulius.restaurant.service;

import com.saulius.restaurant.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{

    public static User user = new User("Username", "useris123", "Name", "Email", "Role");

    @Override
    public Optional<User> getUserByUsername (String username) {
        return Optional.of(user);
    }

    @Override
    public List<User> getUsers() {
        return null;
    }

    @Override
    public boolean hasUserWithUsername(String username) {
        return true;
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return true;
    }

    @Override
    public User validateAndGetUserByUsername(String username) {
        return null;
    }

    @Override
    public User saveUser(User user) {
        return null;
    }

    @Override
    public void deleteUser(User user) {

    }
}
