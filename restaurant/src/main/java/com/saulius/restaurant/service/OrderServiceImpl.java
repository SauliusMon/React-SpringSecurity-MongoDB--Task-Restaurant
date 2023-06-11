package com.saulius.restaurant.service;

import com.saulius.restaurant.model.Meal;
import com.saulius.restaurant.model.Menu;
import com.saulius.restaurant.model.Order;
import com.saulius.restaurant.model.User;
import com.saulius.restaurant.repo.MealRepository;
import com.saulius.restaurant.repo.MenuRepository;
import com.saulius.restaurant.repo.OrderRepository;
import com.saulius.restaurant.repo.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class OrderServiceImpl implements OrderService{

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final MenuRepository menuRepository;
    private final MealRepository mealRepository;

    @Override
    public Order getOrderByID(String orderID) {
        return orderRepository.findById(orderID).orElse(null);
    }

    @Override
    public List<Order> getUserOrders(String email) {
        Optional<User> userWhoOrdered = userRepository.findByEmail(email);
        if (userWhoOrdered.isPresent()) {
            return userWhoOrdered.map(User::getOrders).orElse(new ArrayList<>());
        }
        return null;
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public void deleteOrder(String orderID) {
        Optional<Order> orderToDelete = orderRepository.findById(orderID);

        if (orderToDelete.isPresent()) {
            orderRepository.delete(orderToDelete.get());

            //Necessary to return products quantity back to menu / meals from order if it's not confirmed
            mealRepository.findAll().forEach(meal -> {
                Optional<Meal> matchingOrderMeal = orderToDelete.get().getMeals().stream().filter(orderMeal -> orderMeal.getId().equals(meal.getId())).findFirst();
                if (matchingOrderMeal.isPresent()) {
                    meal.setQuantity(meal.getQuantity() + matchingOrderMeal.get().getQuantity());
                    mealRepository.save(meal);
                }
            });
        }
    }

    @Override
    public void acceptOrder(String orderID) {
        Optional<Order> orderToAccept = orderRepository.findById(orderID);
        if (orderToAccept.isPresent()) {
            orderToAccept.get().setOrderConfirmed(true);
            orderRepository.save(orderToAccept.get());
        }
    }

    @Override
    public Boolean createNewOrder(String email, String menuID, Order newOrder) {
        Optional<User> userWhoOrdered = userRepository.findByEmail(email);
        if (userWhoOrdered.isPresent()) {
            if (!newOrder.getMeals().isEmpty()) {
                orderRepository.save(newOrder);
                userWhoOrdered.get().addNewOrder(newOrder);
                userRepository.save(userWhoOrdered.get());

                //If this menu isn't found something went wrong
                Optional<Menu> foundMenu = menuRepository.findById(menuID);
                if (foundMenu.isPresent()) {
                    List<Meal> mealsInOrder = newOrder.getMeals();

                    //Replaces quantities in menu by subtracting amount ordered
                    //Because of front-end implementation quantity shouldn't get bellow zero
                    foundMenu.get().setMealsInMenu(foundMenu.get().getMealsInMenu().stream().peek(menuMeal -> {
                                        Optional<Meal> matchingOrderMeal = mealsInOrder.stream().filter(orderMeal -> orderMeal.getId().equals(menuMeal.getId())).findFirst();
                                        if (matchingOrderMeal.isPresent()) {
                                            menuMeal.setQuantity(menuMeal.getQuantity() - matchingOrderMeal.get().getQuantity());
                                            mealRepository.save(menuMeal);
                                        }
                                    })
                            .collect(Collectors.toSet()));
                    menuRepository.save(foundMenu.get());
                }
                return true;
            }
        }
        return false;
    }



    ;





}
