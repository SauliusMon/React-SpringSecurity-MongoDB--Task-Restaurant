package com.saulius.restaurant.mapper;

import com.saulius.restaurant.model.Meal;
import com.saulius.restaurant.model.MealCategory;
import com.saulius.restaurant.model.Menu;
import com.saulius.restaurant.rest.dto.MealDto;
import com.saulius.restaurant.rest.dto.MenuDto;

import java.util.Arrays;
import java.util.HashSet;

public class MealMapper {

    public static Meal mealDtoToMeal (MealDto mealDto) {
        return new Meal(mealDto.getMealCategory(),
                        mealDto.getName(),
                        mealDto.getDescription(),
                        mealDto.getQuantity(),
                        mealDto.getPrice());
    }
//Arrays.stream(MealCategory.values()).filter(mealCategory -> mealCategory.getName().equals(mealDto.getMealCategory())).findFirst().orElse
}
