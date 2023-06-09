package com.saulius.restaurant.service;

import com.saulius.restaurant.model.Meal;
import com.saulius.restaurant.model.Menu;
import com.saulius.restaurant.repo.MealRepository;
import com.saulius.restaurant.repo.MenuRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class MenuServiceImpl implements MenuService{

    private final MenuRepository menuRepository;
    private final MealRepository mealRepository;

    @Override
    public Menu getMenuByID(String ID) {
        return menuRepository.findById(ID).orElse(null);
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
    public boolean addMealToMenu(String menuID, String mealID) {
        Optional<Meal> mealToAdd = mealRepository.findById(mealID);
        if (mealToAdd.isPresent()) {
            Optional<Menu> menuToGet = menuRepository.findById(menuID);
            if (menuToGet.isPresent()) {
                menuToGet.get().addMealToMenu(mealToAdd.get());
                menuRepository.save(menuToGet.get());
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean removeMealFromMenu(String menuID, String mealID) {
        Optional<Meal> mealToRemove = mealRepository.findById(mealID);
        if (mealToRemove.isPresent()) {
            Optional<Menu> menuToGet = menuRepository.findById(menuID);
            if (menuToGet.isPresent()) {
                menuToGet.get().removeMealFromMenu(mealToRemove.get());
                menuRepository.save(menuToGet.get());
                return true;
            }
        }
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
