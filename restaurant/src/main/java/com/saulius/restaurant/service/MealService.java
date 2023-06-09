package com.saulius.restaurant.service;

import com.saulius.restaurant.model.Meal;
import com.saulius.restaurant.model.MealCategory;
import com.saulius.restaurant.model.Menu;

import java.util.List;
import java.util.Set;

public interface MealService {

    Meal getMealByID(String mealID);

    List<Meal> getMealByNameFilter(String name);

    List<Meal> getAllMeals();

    List<String> getAllMealsCategories();

    boolean createMeal(Meal meal);

    void deleteMeal(String mealID);



}
