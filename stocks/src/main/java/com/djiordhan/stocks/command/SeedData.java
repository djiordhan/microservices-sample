package com.djiordhan.stocks.command;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.djiordhan.stocks.model.Stock;
import com.djiordhan.stocks.repository.StockRepository;

@Component
public class SeedData implements CommandLineRunner {

    private final StockRepository stockRepository;

    @Autowired
    public SeedData(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (stockRepository.count() == 0) {
            // If no entries found in the database, seed the data
            List<Stock> stocks = getStocks();
            stockRepository.saveAll(stocks);
        }
    }

    private List<Stock> getStocks() {
        // Your stock data
        // This is just an example, you can adjust it as per your requirement
        return List.of(
                new Stock(1L, 110, 500),
                new Stock(2L, 50, 100),
                new Stock(3L, 20, 500),
                new Stock(4L, 30, 400),
                new Stock(5L, 50, 300),
                new Stock(6L, 70, 200),
                new Stock(7L, 80, 300),
                new Stock(8L, 50, 600),
                new Stock(9L, 20, 200));
    }
}
