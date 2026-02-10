package com.carrental.repository;

import com.carrental.model.Car;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends MongoRepository<Car, String> {
    // Cela nous permet de manipuler les voitures dans la base de données
}