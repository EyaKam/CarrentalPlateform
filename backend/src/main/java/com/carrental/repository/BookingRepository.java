package com.carrental.repository;

import com.carrental.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List; // Import important pour les listes

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {
    
    // Trouve toutes les réservations faites par cet utilisateur
    List<Booking> findByUserId(String userId);
    
    // Trouve toutes les réservations pour une voiture
    List<Booking> findByCarId(String carId);
    
}