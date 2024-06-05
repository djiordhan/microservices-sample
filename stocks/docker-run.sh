docker run -p 8085:8085 \
    -e DB_URL=jdbc:mysql://localhost:3306/stocks \
    -e DB_USER=root \
    -e DB_PASSWORD=root \
    -e SERVER_PORT=8086 \
    -e CONTEXT_PATH=/members \
    -e EUREKA_SERVER=http://localhost:8761/eureka/ \
    stocks-service