package com.saulius.restaurant.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;
import java.util.Set;

@Data
@Document("Menus")
public class Menu {

    @Id
    private String id;

    private String menuTitle;

    @DBRef
    private Set<Meal> mealsInMenu;

    public Menu(String menuTitle, Set<Meal> mealsInMenu) {
        this.menuTitle = menuTitle;
        this.mealsInMenu = mealsInMenu;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMenuTitle() {
        return menuTitle;
    }

    public void setMenuTitle(String menuTitle) {
        this.menuTitle = menuTitle;
    }

    public Set<Meal> getMealsInMenu() {
        return mealsInMenu;
    }

    public void setMealsInMenu(Set<Meal> mealsInMenu) {
        this.mealsInMenu = mealsInMenu;
    }

    public boolean addMealToMenu(Meal mealToAdd) {
        return this.mealsInMenu.add(mealToAdd);
    }

    public boolean removeMealFromMenu(Meal mealToRemove) {
        return this.mealsInMenu.remove(mealToRemove);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Menu menu = (Menu) o;
        return Objects.equals(id, menu.id) && Objects.equals(menuTitle, menu.menuTitle) && Objects.equals(mealsInMenu, menu.mealsInMenu);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, menuTitle, mealsInMenu);
    }

    @Override
    public String toString() {
        return "Menu{" +
                "id='" + id + '\'' +
                ", menuTitle='" + menuTitle + '\'' +
                ", mealsInMenu=" + mealsInMenu +
                '}';
    }
}
