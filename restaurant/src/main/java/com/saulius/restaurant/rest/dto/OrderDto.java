package com.saulius.restaurant.rest.dto;

import com.saulius.restaurant.model.Meal;
import com.saulius.restaurant.model.User;

import java.util.List;
import java.util.Objects;

public class OrderDto {

    private String id;

    private String orderName;

    private String userName;

    private String userEmail;

    private List<Meal> meals;

    private boolean orderConfirmed;

    public OrderDto(String id, String orderName, String userName, String userEmail, List<Meal> meals, boolean orderConfirmed) {
        this.id = id;
        this.orderName = orderName;
        this.userName = userName;
        this.userEmail = userEmail;
        this.meals = meals;
        this.orderConfirmed = orderConfirmed;
    }

    public OrderDto(String orderName, String userName, String userEmail, List<Meal> meals, boolean orderConfirmed) {
        this.orderName = orderName;
        this.userName = userName;
        this.userEmail = userEmail;
        this.meals = meals;
        this.orderConfirmed = orderConfirmed;
    }

    public OrderDto() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderName() {
        return orderName;
    }

    public void setOrderName(String orderName) {
        this.orderName = orderName;
    }

    public List<Meal> getMeals() {
        return meals;
    }

    public void setMeals(List<Meal> meals) {
        this.meals = meals;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public boolean isOrderConfirmed() {
        return orderConfirmed;
    }

    public void setOrderConfirmed(boolean orderConfirmed) {
        this.orderConfirmed = orderConfirmed;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderDto orderDto = (OrderDto) o;
        return orderConfirmed == orderDto.orderConfirmed && Objects.equals(id, orderDto.id) && Objects.equals(orderName, orderDto.orderName) && Objects.equals(userName, orderDto.userName) && Objects.equals(userEmail, orderDto.userEmail) && Objects.equals(meals, orderDto.meals);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, orderName, userName, userEmail, meals, orderConfirmed);
    }

    @Override
    public String toString() {
        return "OrderDto{" +
                "id='" + id + '\'' +
                ", orderName='" + orderName + '\'' +
                ", userName='" + userName + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", meals=" + meals +
                ", orderConfirmed=" + orderConfirmed +
                '}';
    }
}
