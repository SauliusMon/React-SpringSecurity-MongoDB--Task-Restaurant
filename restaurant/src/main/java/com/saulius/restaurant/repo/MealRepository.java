package com.saulius.restaurant.repo;

import com.saulius.restaurant.model.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealRepository extends MongoRepository<Meal, String> {
}
