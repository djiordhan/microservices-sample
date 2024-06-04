package com.djiordhan.stocks.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import main.java.com.djiordhan.stocks.model.Stock;
import main.java.com.djiordhan.stocks.service.StockService;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    private final StockService stockService;

    @Autowired
    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping
    public List<Stock> getAllStocks() {
        return stockService.getAllStocks();
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Stock> getStockById(@PathVariable Long productId) {
        Optional<Stock> stock = stockService.getStockById(productId);
        return stock.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
