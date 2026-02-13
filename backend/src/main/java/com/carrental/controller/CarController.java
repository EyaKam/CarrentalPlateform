package com.carrental.controller;

import com.carrental.model.Car;
import com.carrental.services.car.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
public class CarController {

    private final CarService carService;

    // 1. Ajouter une nouvelle voiture (pour les propriétaires)
    @PostMapping
    public ResponseEntity<?> addCar(@RequestBody Car car) {
        try {
            Car createdCar = carService.createCar(car);
            return new ResponseEntity<>(createdCar, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de l'ajout de la voiture", HttpStatus.BAD_REQUEST);
        }
    }

    // 2. Obtenir toutes les voitures
    @GetMapping
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> cars = carService.getAllCars();
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    // 3. Obtenir une voiture par ID
    @GetMapping("/{carId}")
    public ResponseEntity<?> getCarById(@PathVariable String carId) {
        Optional<Car> car = carService.getCarById(carId);
        if (car.isPresent()) {
            return new ResponseEntity<>(car.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>("Voiture non trouvée", HttpStatus.NOT_FOUND);
    }

    // 4. Obtenir les voitures d'un propriétaire
    @GetMapping("/owner/{userId}")
    public ResponseEntity<List<Car>> getCarsByUserId(@PathVariable String userId) {
        List<Car> cars = carService.getCarsByUserId(userId);
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    // 5. Mettre à jour une voiture
    @PutMapping("/{carId}")
    public ResponseEntity<?> updateCar(@PathVariable String carId, @RequestBody Car car) {
        try {
            Car updatedCar = carService.updateCar(carId, car);
            if (updatedCar != null) {
                return new ResponseEntity<>(updatedCar, HttpStatus.OK);
            }
            return new ResponseEntity<>("Voiture non trouvée", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la mise à jour", HttpStatus.BAD_REQUEST);
        }
    }

    // 6. Supprimer une voiture
    @DeleteMapping("/{carId}")
    public ResponseEntity<?> deleteCar(@PathVariable String carId) {
        try {
            carService.deleteCar(carId);
            return new ResponseEntity<>("Voiture supprimée avec succès", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la suppression", HttpStatus.BAD_REQUEST);
        }
    }

    // 7. Vérifier la disponibilité
    @GetMapping("/{carId}/availability")
    public ResponseEntity<?> checkAvailability(@PathVariable String carId) {
        boolean available = carService.isCarAvailable(carId);
        return new ResponseEntity<>(available, HttpStatus.OK);
    }
}
