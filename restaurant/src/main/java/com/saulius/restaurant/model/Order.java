package com.saulius.restaurant.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Objects;

@Data
@Document("Orders")
public class Order {

    @Id
    private String id;

    private String orderName;

    private String userName;

    private String userEmail;

    private List<Meal> meals;

    private boolean orderConfirmed;

    public Order(String id, String orderName, String userName, String userEmail, List<Meal> meals, boolean orderConfirmed) {
        this.id = id;
        this.orderName = orderName;
        this.userName = userName;
        this.userEmail = userEmail;
        this.meals = meals;
        this.orderConfirmed = orderConfirmed;
    }

    public Order(String orderName, String userName, String userEmail, List<Meal> meals, boolean orderConfirmed) {
        this.orderName = orderName;
        this.userName = userName;
        this.userEmail = userEmail;
        this.meals = meals;
        this.orderConfirmed = orderConfirmed;
    }

    public Order() {
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
        Order order = (Order) o;
        return orderConfirmed == order.orderConfirmed && Objects.equals(id, order.id) && Objects.equals(orderName, order.orderName) && Objects.equals(userName, order.userName) && Objects.equals(userEmail, order.userEmail) && Objects.equals(meals, order.meals);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, orderName, userName, userEmail, meals, orderConfirmed);
    }

    @Override
    public String toString() {
        return "Order{" +
                "id='" + id + '\'' +
                ", orderName='" + orderName + '\'' +
                ", userName='" + userName + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", meals=" + meals +
                ", orderConfirmed=" + orderConfirmed +
                '}';
    }
}
