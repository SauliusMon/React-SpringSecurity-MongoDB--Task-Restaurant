package com.saulius.restaurant.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document("Users")
@NoArgsConstructor
public class User {

    @Id
    private String id;

    private String username;
    private String password;
    private String name;
    private String email;
    private String role;

    @DBRef
    private List<Order> orders = new ArrayList<>();

    public User(String username, String password, String name, String email, String role) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public void addNewOrder (Order newOrder) {
        orders.add(newOrder);
    }

    public List<Order> getOrders() {
        if (orders != null) {
            return orders;
        }
        return new ArrayList<>();
    }
}