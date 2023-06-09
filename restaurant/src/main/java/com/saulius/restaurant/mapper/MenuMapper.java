package com.saulius.restaurant.mapper;

import com.saulius.restaurant.model.Menu;
import com.saulius.restaurant.rest.dto.MenuDto;

import java.util.HashSet;

public class MenuMapper {

    public static Menu menuDtoToMenu (MenuDto menuDto) {
        return new Menu(menuDto.getMenuTitle(), new HashSet<>());
    }
}
