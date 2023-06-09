package com.saulius.restaurant.rest;


import com.saulius.restaurant.mapper.MenuMapper;
import com.saulius.restaurant.model.Menu;
import com.saulius.restaurant.rest.dto.MenuDto;
import com.saulius.restaurant.service.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.saulius.restaurant.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/menu")
public class MenuController {

    private final MenuService menuService;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/get-menu/{menuID}")
    public ResponseEntity<Menu> getMenuByID (@PathVariable String menuID) {
        return ResponseEntity.ok(menuService.getMenuByID(menuID));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/get-menus-filtered/{nameFilter}")
    public ResponseEntity<List<Menu>> getMenuByNameFilter (@PathVariable String nameFilter) {
        return ResponseEntity.ok(menuService.getMenuByNameFilter(nameFilter));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/get-menus")
    public ResponseEntity<List<Menu>> getAllMenus () {
        return ResponseEntity.ok(menuService.getAllMenus());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PostMapping("/create-menu")
    public void createMenu (@RequestBody MenuDto menuDtoToCreate) {
        menuService.createMenu(MenuMapper.menuDtoToMenu(menuDtoToCreate));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/delete-menu/{menuID}")
    public void deleteMenu (@PathVariable String menuID) {
        menuService.deleteMenu(menuID);
    }


}
