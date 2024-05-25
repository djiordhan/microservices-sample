package com.djiordhan.products.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.djiordhan.products.model.Product;
import com.djiordhan.products.repsonse.ProductResponse;
import com.djiordhan.products.repsonse.StockResponse;
import com.djiordhan.products.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping
    public List<Product> findAll() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public ProductResponse findById(@PathVariable Long id) {

        ProductResponse productResponse = productService.findById(id).get();

        StockResponse stock = restTemplate.getForObject("http://localhost:3000/stocks/{id}", StockResponse.class, id);

        productResponse.setStock(stock);

        return productResponse;
    }

    @GetMapping("/withStocks/{id}")
    public Optional<ProductResponse> findByIdWithStocks(@PathVariable Long id) {
        return productService.findById(id);
    }

    @GetMapping("/find/name/{name}")
    public List<Product> findByName(@PathVariable String name) {
        return productService.findByName(name);
    }

    @GetMapping("/find/price-greater-than/{price}")
    public List<Product> findByPriceGreaterThan(@PathVariable BigDecimal price) {
        return productService.findByPriceGreaterThan(price);
    }
}