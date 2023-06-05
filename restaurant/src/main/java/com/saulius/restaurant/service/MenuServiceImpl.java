package com.saulius.restaurant.service;

import com.saulius.restaurant.model.Menu;
import com.saulius.restaurant.repo.MealRepository;
import com.saulius.restaurant.repo.MenuRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@AllArgsConstructor
@Service
public class MenuServiceImpl implements MenuService{

    private final MenuRepository menuRepository;

    @Override
    public Menu getMenuByID(String ID) {
        return null;
    }

    @Override
    public Set<Menu> getAllMenus() {
        return null;
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
        System.out.println("Service is called");
        menuRepository.save(menu);
        System.out.println("Saving succ");
        return false;
    }


}
