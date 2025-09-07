#FROM openjdk:17-jdk-alpine
FROM openjdk:21-jdk
WORKDIR /app

# Copy the Maven wrapper files into the container
COPY .mvn/ .mvn/
COPY mvnw .
COPY pom.xml .

# Run a 'dependency-only' build to cache the dependencies
RUN ./mvnw dependency:go-offline

# Copy the source code to the image
COPY src/ src/

RUN ./mvnw clean package -DskipTests

RUN cp target/commentpayment-0.0.1.jar commentpayment.jar
EXPOSE 8080

CMD ["java","-jar","commentpayment.jar"]