package com.saulius.restaurant.rest;

import com.saulius.restaurant.mapper.UserMapper;
import com.saulius.restaurant.model.Menu;
import com.saulius.restaurant.model.User;
import com.saulius.restaurant.rest.dto.UserDto;
import com.saulius.restaurant.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

import static com.saulius.restaurant.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/get-users")
    public ResponseEntity<List<UserDto>> getAllUsers () {
        List<UserDto> users = userService.getUsers();
        if (users.isEmpty()) {
            //Change
            throw new RuntimeException();
        }
        else {
            return ResponseEntity.ok(users);
        }
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/get-users-by-username/{username}")
    public ResponseEntity<List<UserDto>> getUsersByUsername (@PathVariable String username) {
        List<UserDto> filteredUsers = userService.getUsersByUsernameFilter(username);
        if (filteredUsers.isEmpty()) {
            return ResponseEntity.ok(filteredUsers);
        }
        else {
            return ResponseEntity.ok(filteredUsers);
        }
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/delete-user/{username}")
    public ResponseEntity<UserDto> createMenu (@PathVariable String username) {
        User userToDelete = userService.getUserByUsername(username);
        userService.deleteUser(userToDelete);

        return ResponseEntity.ok(UserMapper.userToUserDto(userToDelete));
    }
}
