package com.carrental.repository;

import com.carrental.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository; // Import MongoDB
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> { // Note le <User, String>
    Optional<User> findFirstByEmail(String email);
}