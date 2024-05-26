docker run -e DB_URL=jdbc:postgresql://your-db-host:your-db-port/your-db-name \
           -e DB_USERNAME=your-username \
           -e DB_PASSWORD=your-password \
           -e SERVER_PORT=your-server-port \
           -e CONTEXT_PATH=your-context-path \
           -p your-server-port:your-server-port \
           product-service
