package com.carrental.repository;

import com.carrental.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    // Ici, on pourra ajouter des fonctions spéciales plus tard si besoin
    // Par exemple: User findByEmail(String email);
}