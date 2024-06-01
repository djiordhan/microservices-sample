package com.djiordhan.products.clients;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.loadbalancer.annotation.LoadBalancerClient;
import org.springframework.context.annotation.Bean;

import feign.Feign;

@LoadBalancerClient(name = "stocks", configuration = LoadBalancerConfiguration.class)
public class StocksClientLoadBalancer {

    @LoadBalanced
    @Bean
    public Feign.Builder fBuilder() {
        return Feign.builder();
    }

}
