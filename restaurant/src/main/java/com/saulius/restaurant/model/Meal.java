package com.saulius.restaurant.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

@Data
@Document("Meals")
public class Meal {

    @Id
    private String id;

    private MealCategory mealCategory;

    private String name;
    private String description;
    private int quantity;
    private double price;

    @DBRef
    private Menu menu;

    public Meal(MealCategory mealCategory, String name, String description, int quantity, double price) {
        this.mealCategory = mealCategory;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
    }

    public Meal(MealCategory mealCategory, String name, String description, int quantity, double price, Menu menu) {
        this.mealCategory = mealCategory;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.menu = menu;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public MealCategory getMealCategory() {
        return mealCategory;
    }

    public void setMealCategory(MealCategory mealCategory) {
        this.mealCategory = mealCategory;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Menu getMenu() {
        return menu;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Meal meal = (Meal) o;
        return quantity == meal.quantity && Double.compare(meal.price, price) == 0 && Objects.equals(id, meal.id) && Objects.equals(name, meal.name) && Objects.equals(description, meal.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, quantity, price);
    }

    @Override
    public String toString() {
        return "Meal{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", descprition='" + description + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                '}';
    }
}
