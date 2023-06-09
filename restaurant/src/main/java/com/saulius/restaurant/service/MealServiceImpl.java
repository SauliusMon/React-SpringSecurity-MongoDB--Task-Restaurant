package com.saulius.restaurant.service;

import com.saulius.restaurant.model.Meal;
import com.saulius.restaurant.model.MealCategory;
import com.saulius.restaurant.repo.MealRepository;
import com.saulius.restaurant.rest.MealController;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class MealServiceImpl implements MealService{

    private final MealRepository mealRepository;

    @Override
    public Meal getMealByID(String ID) {
        return null;
    }

    @Override
    public List<Meal> getMealByNameFilter(String nameFilter) {
        return mealRepository.findAll().stream().filter(meal -> meal.getName().toLowerCase().contains(nameFilter.toLowerCase())).collect(Collectors.toList());
    }

    @Override
    public List<Meal> getAllMeals() {
        return mealRepository.findAll(Sort.by(Sort.Direction.ASC, "mealCategory"));
    }

    @Override
    public List<String> getAllMealsCategories() {
        return Arrays.stream(MealCategory.values()).map(MealCategory::getName).collect(Collectors.toList());
    }

    @Override
    public boolean createMeal(Meal meal) {
        mealRepository.save(meal);
        return false;
    }

    @Override
    public void deleteMeal(String mealID) {
        mealRepository.deleteById(mealID);
    }
}
