package com.saulius.restaurant.mapper;

import com.saulius.restaurant.model.Order;
import com.saulius.restaurant.rest.dto.OrderDto;

public class OrderMapper {

    public static Order orderDtoToNewOrder (OrderDto orderDto) {
        return new Order(orderDto.getOrderName(), orderDto.getUserName(), orderDto.getUserEmail(), orderDto.getMeals(), false);
    }

    public static Order orderDtoToExistingOrder (OrderDto orderDto) {
        return new Order(orderDto.getId(), orderDto.getOrderName(), orderDto.getUserName(), orderDto.getUserEmail(), orderDto.getMeals(), orderDto.isOrderConfirmed());
    }

    public static OrderDto orderToOrderDto (Order order) {
        return new OrderDto(order.getId(), order.getOrderName(), order.getUserName(), order.getUserEmail(), order.getMeals(), order.isOrderConfirmed());
    }
}
