package com.saulius.restaurant.service;

import com.saulius.restaurant.model.Menu;

import java.util.List;

public interface MenuService {

    Menu getMenuByID(String menuID);

    List<Menu> getMenuByNameFilter(String nameFilter);

    List<Menu> getAllMenus();

    boolean addMealToMenu(String ID, String mealID);

    boolean removeMealFromMenu(String menuID, String mealID);

    boolean createMenu(Menu menu);

    void deleteMenu(String menuID);

}

