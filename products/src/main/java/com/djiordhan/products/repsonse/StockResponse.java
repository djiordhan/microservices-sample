package com.djiordhan.products.repsonse;

public class StockResponse {

    private int productId;
    private int stocks;
    private int sold;

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getSold() {
        return sold;
    }

    public void setSold(int sold) {
        this.sold = sold;
    }

    public int getStocks() {
        return stocks;
    }

    public void setStocks(int stocks) {
        this.stocks = stocks;
    }

    @Override
    public String toString() {
        return "ProductId: " + this.productId;
    }

}
