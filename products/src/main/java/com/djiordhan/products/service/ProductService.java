package com.djiordhan.products.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.djiordhan.products.model.Product;
import com.djiordhan.products.repository.ProductRepository;
import com.djiordhan.products.repsonse.ProductResponse;
import com.djiordhan.products.repsonse.StockResponse;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${stocks.base.url}")
    private String stocksBaseUrl;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public ProductResponse findById(Long id) {
        ProductResponse productResponse = productRepository.findById(id).map(this::mapToProductResponse).get();
        StockResponse stock = restTemplate.getForObject(stocksBaseUrl + "/stocks/{id}", StockResponse.class, id);
        productResponse.setStock(stock);

        return productResponse;
    }

    private ProductResponse mapToProductResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setImagePath(product.getImagePath());
        return response;
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> findByName(String name) {
        return productRepository.findByName(name);
    }

    public List<Product> findByPriceGreaterThan(BigDecimal price) {
        return productRepository.findByPriceGreaterThan(price);
    }
}