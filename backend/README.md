# Car Rental Backend

A Spring Boot backend application for a car rental system with MongoDB database.

## Tech Stack

- **Java 17+** - Programming language
- **Spring Boot 3.x** - Web framework
- **Spring Data MongoDB** - Database abstraction layer
- **MongoDB** - NoSQL database
- **Maven** - Build and dependency management

## Project Structure

```
src/
├── main/
│   ├── java/com/carrental/
│   │   ├── BackendApplication.java       # Main Spring Boot application
│   │   ├── config/
│   │   │   └── MongoConfig.java          # MongoDB configuration
│   │   ├── controller/
│   │   │   └── BookingController.java    # REST endpoints for bookings
│   │   ├── model/
│   │   │   ├── Booking.java              # Booking entity
│   │   │   ├── Car.java                  # Car entity
│   │   │   └── User.java                 # User entity
│   │   └── repository/
│   │       ├── BookingRepository.java    # Booking data access
│   │       ├── CarRepository.java        # Car data access
│   │       └── UserRepository.java       # User data access
│   └── resources/
│       └── application.properties        # Application configuration
└── test/
    └── java/com/carrental/backend/
        └── BackendApplicationTests.java  # Unit tests
```

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MongoDB running locally or accessible via connection string

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   mvn clean install
   ```

3. **Configure MongoDB connection:**
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb://localhost:27017/carrental
   spring.application.name=carrental-backend
   ```

4. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```
   The application will start on `http://localhost:8080`

## API Endpoints

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/{id}` - Get booking by ID
- `PUT /api/bookings/{id}` - Update booking
- `DELETE /api/bookings/{id}` - Delete booking

## Build & Deploy

```bash
# Build JAR file
mvn clean package

# Run the JAR
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.
