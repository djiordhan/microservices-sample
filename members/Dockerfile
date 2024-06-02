FROM openjdk:23-jdk-slim

RUN mkdir /app

COPY build/libs/*.jar /app/app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar", \
    "--spring.data.mongodb.uri=${DB_URL}", \
    "--server.port=${SERVER_PORT}", \
    "--eureka.client.service-url.defaultZone=${EUREKA_SERVER}", \
    "--server.servlet.context-path=${CONTEXT_PATH}"]