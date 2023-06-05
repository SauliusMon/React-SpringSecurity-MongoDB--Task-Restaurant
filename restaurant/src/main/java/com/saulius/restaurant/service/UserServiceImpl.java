package com.saulius.restaurant.service;

import com.saulius.restaurant.model.User;
import com.saulius.restaurant.repo.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService{

    //public static User user = new User("Username", "useris123", "Name", "Email", "Role");

    private final UserRepository userRepository;

    @Override
    public Optional<User> getUserByUsername (String username) {
        return userRepository.findAll().stream().filter(user -> user.getUsername().equals(username)).findAny();
    }

    @Override
    public List<User> getUsers() {
        return null;
    }

    @Override
    public boolean hasUserWithUsername(String username) {
        return userRepository.findAll().stream().anyMatch(user -> user.getUsername().equals(username));
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return false;
    }

    @Override
    public User validateAndGetUserByUsername(String username) {
        return null;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {

    }
}
