package com.saulius.restaurant.rest;


import com.saulius.restaurant.model.Menu;
import com.saulius.restaurant.service.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;

import static com.saulius.restaurant.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/menu")
public class MenuController {

    private final MenuService menuService;

    @GetMapping("/get-menu/{menuID}")
    public ResponseEntity<Menu> getMenuByID (@PathVariable String menuID) {
        return ResponseEntity.ok(menuService.getMenuByID(menuID));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/create-menu")
    public void createMenu () {
        menuService.createMenu(new Menu("Geras Menu", new HashSet<>()));
    }
}
