package com.djiordhan.stocks.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Stock {

    @Id
    private Long productId;
    private int stocks;
    private int sold;

    // Constructors, getters, and setters
    public Stock() {
    }

    public Stock(Long productId, int stocks, int sold) {
        this.productId = productId;
        this.stocks = stocks;
        this.sold = sold;
    }

    // Getters and Setters
    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getStocks() {
        return stocks;
    }

    public void setStocks(int stocks) {
        this.stocks = stocks;
    }

    public int getSold() {
        return sold;
    }

    public void setSold(int sold) {
        this.sold = sold;
    }
}
