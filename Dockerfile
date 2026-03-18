FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src

RUN chmod +x gradlew
RUN ./gradlew bootJar --no-daemon

EXPOSE 8080

CMD ["java", "-jar", "/app/build/libs/LikeKBO-0.0.1-SNAPSHOT.jar"]