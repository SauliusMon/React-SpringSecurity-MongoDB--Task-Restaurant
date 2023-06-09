package com.saulius.restaurant.rest.dto;

import com.saulius.restaurant.model.MealCategory;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

import java.util.Objects;

public class MealDto {

    private String mealCategory;
    @Schema(example = "meal")
    @NotBlank
    private String name;
    @Schema(example = "meal")
    @NotBlank
    private String description;
    private int quantity;
    private double price;

    public MealDto(String mealCategory, String name, String description, int quantity, double price) {
        this.mealCategory = mealCategory;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
    }

    public String getMealCategory() {
        return mealCategory;
    }

    public void setMealCategory(String mealCategory) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MealDto mealDto = (MealDto) o;
        return quantity == mealDto.quantity && Double.compare(mealDto.price, price) == 0 && mealCategory == mealDto.mealCategory && Objects.equals(name, mealDto.name) && Objects.equals(description, mealDto.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(mealCategory, name, description, quantity, price);
    }

    @Override
    public String toString() {
        return "MealDto{" +
                "mealCategory=" + mealCategory +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                '}';
    }
}
