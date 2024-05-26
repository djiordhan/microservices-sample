docker run -e DB_URL=jdbc:postgresql://localhost:5432/pos \
           -e DB_USERNAME=myuser \
           -e DB_PASSWORD=mypassword \
           -e SERVER_PORT=8002 \
           -e CONTEXT_PATH=/products-app/api \
           -p 8002:8002 \
           product-service
