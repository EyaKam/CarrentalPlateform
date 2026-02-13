package com.carrental.services.car;

import com.carrental.model.Car;
import java.util.List;
import java.util.Optional;

public interface CarService {
    // Créer une voiture
    Car createCar(Car car);
    
    // Obtenir toutes les voitures
    List<Car> getAllCars();
    
    // Obtenir une voiture par ID
    Optional<Car> getCarById(String carId);
    
    // Obtenir les voitures d'un propriétaire
    List<Car> getCarsByUserId(String userId);
    
    // Mettre à jour une voiture
    Car updateCar(String carId, Car car);
    
    // Supprimer une voiture
    void deleteCar(String carId);
    
    // Vérifier la disponibilité
    boolean isCarAvailable(String carId);
}
