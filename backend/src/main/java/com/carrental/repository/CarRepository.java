package com.carrental.repository;

import com.carrental.model.Car;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CarRepository extends MongoRepository<Car, String> {
    // Cela nous permet de manipuler les voitures dans la base de données
    
    // Trouver toutes les voitures d'un propriétaire
    List<Car> findByUserId(String userId);
}