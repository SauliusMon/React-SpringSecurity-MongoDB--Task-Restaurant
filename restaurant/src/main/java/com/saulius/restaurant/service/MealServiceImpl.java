package com.saulius.restaurant.service;

import com.saulius.restaurant.model.Meal;
import com.saulius.restaurant.repo.MealRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@AllArgsConstructor
@Service
public class MealServiceImpl implements MealService{

    private final MealRepository mealRepository;

    @Override
    public Meal getMealByID(String ID) {
        return null;
    }

    @Override
    public Meal getMealByName(String name) {
        return null;
    }

    @Override
    public Set<Meal> getMeals() {
        return null;
    }
}
