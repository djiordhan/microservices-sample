FROM openjdk:23-jdk-slim

RUN mkdir /app

COPY build/libs/*.jar /app/app.jar

EXPOSE 8761

ENTRYPOINT ["java","-jar","/app/app.jar"]
