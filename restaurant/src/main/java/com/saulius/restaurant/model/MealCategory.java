package com.saulius.restaurant.model;

public enum MealCategory {

    MAIN_DISH("Main Dish"), DESERT("Dessert");

    private final String mealName;

    MealCategory(String mealName) {
        this.mealName = mealName;
    }

    public String getName() {
        return mealName;
    }
}
