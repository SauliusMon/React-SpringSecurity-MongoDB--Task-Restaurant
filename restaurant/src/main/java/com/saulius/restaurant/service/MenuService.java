package com.saulius.restaurant.service;

import com.saulius.restaurant.model.Menu;

import java.util.Set;

public interface MenuService {

    Menu getMenuByID(String ID);

    Set<Menu> getAllMenus();

    boolean addMealToMenuByID(String ID);

    boolean removeMealFromMenuByID(String ID);

    boolean createMenu(Menu menu);



}

