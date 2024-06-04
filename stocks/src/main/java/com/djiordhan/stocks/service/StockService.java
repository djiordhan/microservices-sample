package com.djiordhan.stocks.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.java.com.djiordhan.stocks.model.Stock;
import main.java.com.djiordhan.stocks.repository.StockRepository;

@Service
public class StockService {

    private final StockRepository stockRepository;

    @Autowired
    public StockService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Optional<Stock> getStockById(Long productId) {
        return stockRepository.findById(productId);
    }

    // You can implement other business logic methods here
}
