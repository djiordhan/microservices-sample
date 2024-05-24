package com.djiordhan.products;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.djiordhan.products.model.Product;
import com.djiordhan.products.repository.ProductRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class ProductsApplication {

	private static final Logger logger = LoggerFactory.getLogger(ProductsApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(ProductsApplication.class, args);
	}

	@Bean
	CommandLineRunner seedDatabase(ProductRepository productRepository) {
		return args -> {
			long productCount = productRepository.count();
			if (productCount == 0) {
				logger.info("No products found, seeding database with specified products.");
				List<Product> products = List.of(
						new Product("Burger", "Delicious burger", BigDecimal.valueOf(50.00),
								"/product-images/burger.jpeg"),
						new Product("Donut", "Tasty donut", BigDecimal.valueOf(20.00), "/product-images/donut.jpeg"),
						new Product("Sandwich", "Fresh sandwich", BigDecimal.valueOf(40.00),
								"/product-images/sandwich.jpeg"),
						new Product("Cinnamon Roll", "Sweet cinnamon roll", BigDecimal.valueOf(50.00),
								"/product-images/cinnamonroll.jpeg"),
						new Product("Crosaint", "Flaky crosaint", BigDecimal.valueOf(20.00),
								"/product-images/crosaint.jpeg"),
						new Product("Espresso", "Strong espresso", BigDecimal.valueOf(40.00),
								"/product-images/espresso.jpeg"),
						new Product("Frappe", "Cold frappe", BigDecimal.valueOf(40.00), "/product-images/frappe.jpeg"),
						new Product("Milk Tea", "Refreshing milk tea", BigDecimal.valueOf(40.00),
								"/product-images/milktea.jpeg"),
						new Product("Black Coffee", "Bold black coffee", BigDecimal.valueOf(40.00),
								"/product-images/blackcoffee.jpeg"));
				productRepository.saveAll(products);
				logger.info("Product seeding completed.");
			} else {
				logger.info("Products found, no product seeding necessary.");
			}
		};
	}

}
