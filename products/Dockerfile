# Use the official OpenJDK image as the base image
FROM openjdk:11-jdk-slim as build

# Set the working directory
WORKDIR /home/gradle/app

# Copy the Gradle wrapper and configuration files
COPY gradlew gradlew
COPY gradle gradle

# Copy the project files to the container
COPY . .

# Give execute permission to the Gradle wrapper
RUN chmod +x gradlew

# Build the application using the Gradle wrapper
RUN ./gradlew build

# Use the official OpenJDK image to run the app
FROM openjdk:11-jre-slim

# Set environment variables for configuration
ENV DB_URL=jdbc:postgresql://localhost:5432/pos \
    DB_USERNAME=myuser \
    DB_PASSWORD=mypassword \
    SERVER_PORT=8082 \
    CONTEXT_PATH=/products-app/api

# Create a directory for the app
RUN mkdir /app

# Copy the built application jar file to the container
COPY --from=build /home/gradle/app/build/libs/*.jar /app/app.jar

# Expose the configurable port
EXPOSE ${SERVER_PORT}

# Run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar", \
    "--spring.datasource.url=${DB_URL}", \
    "--spring.datasource.username=${DB_USERNAME}", \
    "--spring.datasource.password=${DB_PASSWORD}", \
    "--server.port=${SERVER_PORT}", \
    "--server.servlet.context-path=${CONTEXT_PATH}"]
