FROM openjdk:23-jdk-slim

RUN mkdir /app

COPY build/libs/*.jar /app/app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar", \
    "--spring.datasource.url=${DB_URL}", \
    "--spring.datasource.username=${DB_USERNAME}", \
    "--spring.datasource.password=${DB_PASSWORD}", \
    "--server.port=${SERVER_PORT}", \
    "--eureka.client.service-url.defaultZone=${EUREKA_SERVER}", \
    "--server.servlet.context-path=${CONTEXT_PATH}"]
