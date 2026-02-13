package com.carrental.services.car;

import com.carrental.model.Car;
import com.carrental.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {

    private final CarRepository carRepository;

    @Override
    public Car createCar(Car car) {
        return carRepository.save(car);
    }

    @Override
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    @Override
    public Optional<Car> getCarById(String carId) {
        return carRepository.findById(carId);
    }

    @Override
    public List<Car> getCarsByUserId(String userId) {
        // Pour cela, il faudra ajouter une méthode dans CarRepository
        // Pour l'instant, on retourne une liste vide
        return carRepository.findByUserId(userId);
    }

    @Override
    public Car updateCar(String carId, Car car) {
        Optional<Car> existingCar = carRepository.findById(carId);
        if (existingCar.isPresent()) {
            car.setId(carId);
            return carRepository.save(car);
        }
        return null;
    }

    @Override
    public void deleteCar(String carId) {
        carRepository.deleteById(carId);
    }

    @Override
    public boolean isCarAvailable(String carId) {
        // TODO: Implémenter la logique de vérification de disponibilité
        // basée sur les réservations confirmées
        return true;
    }
}
