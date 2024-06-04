package com.djiordhan.stocks.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.djiordhan.stocks.model.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
}