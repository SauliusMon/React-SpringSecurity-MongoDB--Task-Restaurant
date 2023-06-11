package com.saulius.restaurant.service;

import com.saulius.restaurant.model.Order;

import java.util.List;

public interface OrderService {

    Order getOrderByID(String menuID);

    List<Order> getAllOrders();

    List<Order> getUserOrders(String email);

    void deleteOrder(String orderID);

    void acceptOrder(String orderID);

    Boolean createNewOrder(String email, String menuID, Order newOrder);

}
