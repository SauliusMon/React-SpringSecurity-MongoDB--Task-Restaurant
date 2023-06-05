package com.saulius.restaurant.service;

import com.saulius.restaurant.model.Meal;

import java.util.Set;

public interface MealService {

    Meal getMealByID(String ID);

    Meal getMealByName(String name);

    Set<Meal> getMeals();



}
