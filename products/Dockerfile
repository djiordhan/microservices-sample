# Use the official OpenJDK 20 runtime image to run the app
FROM openjdk:23-jdk-slim

# Set environment variables for configuration
ENV DB_URL=jdbc:postgresql://localhost:5432/pos \
    DB_USERNAME=myuser \
    DB_PASSWORD=mypassword \
    SERVER_PORT=8082 \
    CONTEXT_PATH=/products-app/api

# Create a directory for the app
RUN mkdir /app

# Copy the built application jar file from the local machine to the container
COPY build/libs/*.jar /app/app.jar

# Expose the configurable port
EXPOSE ${SERVER_PORT}

# Run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar", \
    "--spring.datasource.url=${DB_URL}", \
    "--spring.datasource.username=${DB_USERNAME}", \
    "--spring.datasource.password=${DB_PASSWORD}", \
    "--server.port=${SERVER_PORT}", \
    "--server.servlet.context-path=${CONTEXT_PATH}"]
