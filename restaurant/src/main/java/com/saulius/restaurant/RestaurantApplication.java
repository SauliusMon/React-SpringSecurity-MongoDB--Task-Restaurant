package com.saulius.restaurant;

import com.saulius.restaurant.model.User;
import com.saulius.restaurant.repo.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RestaurantApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestaurantApplication.class, args);
	}

//	@Bean
//	CommandLineRunner runner(UserRepository repository) {
//		return args -> {
//			User user = new User();
//			user.setId(1L);
//			user.setName("Protas");
//			user.setPassword("asdasd");
//
//			repository.insert(user);
//		};
//	}
}
