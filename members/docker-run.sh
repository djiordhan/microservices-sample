docker run -p 8085:8085 \
    -e DB_URL=mongodb://localhost:27017/membersdb \
    -e SERVER_PORT=8085 \
    -e CONTEXT_PATH=/members \
    -e EUREKA_SERVER=http://localhost:8761/eureka/ \
    members-service