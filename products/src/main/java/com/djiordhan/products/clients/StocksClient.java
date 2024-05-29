package com.djiordhan.products.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.djiordhan.products.repsonse.StockResponse;

@FeignClient(name = "stocks", path = "/")
public interface StocksClient {

    @GetMapping("/stocks")
    public ResponseEntity<List<StockResponse>> getStocks();

    @GetMapping("/stocks/{productId}")
    public ResponseEntity<StockResponse> getStocksByProductId(@PathVariable("productId") Long productId);

}
