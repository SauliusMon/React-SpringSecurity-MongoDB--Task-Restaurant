package com.saulius.restaurant.service;

import com.saulius.restaurant.model.Menu;
import com.saulius.restaurant.repo.MealRepository;
import com.saulius.restaurant.repo.MenuRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class MenuServiceImpl implements MenuService{

    private final MenuRepository menuRepository;

    @Override
    public Menu getMenuByID(String ID) {
        return null;
    }

    @Override
    public List<Menu> getMenuByNameFilter(String nameFilter) {
        return menuRepository.findAll().stream().filter(menu -> menu.getMenuTitle().toLowerCase().contains(nameFilter.toLowerCase())).collect(Collectors.toList());
    }

    @Override
    public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }

    @Override
    public boolean addMealToMenuByID(String ID) {
        return false;
    }

    @Override
    public boolean removeMealFromMenuByID(String ID) {
        return false;
    }

    @Override
    public boolean createMenu(Menu menu) {
        menuRepository.save(menu);
        return false;
    }

    @Override
    public void deleteMenu(String menuID) {
        menuRepository.deleteById(menuID);
    }


}
