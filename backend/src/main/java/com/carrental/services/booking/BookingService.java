package com.carrental.services.booking;

import com.carrental.model.Booking;
import java.util.List;
import java.util.Optional;

public interface BookingService {
    // Créer une réservation
    Booking createBooking(Booking booking);
    
    // Obtenir toutes les réservations (pour l'admin)
    List<Booking> getAllBookings();
    
    // Obtenir une réservation par ID
    Optional<Booking> getBookingById(String bookingId);
    
    // Obtenir les réservations d'un utilisateur
    List<Booking> getBookingsByUserId(String userId);
    
    // Obtenir les réservations d'une voiture
    List<Booking> getBookingsByCarId(String carId);
    
    // Confirmer une réservation
    Booking confirmBooking(String bookingId);
    
    // Rejeter une réservation
    Booking rejectBooking(String bookingId);
    
    // Annuler une réservation
    Booking cancelBooking(String bookingId);
    
    // Suppression (admin only)
    void deleteBooking(String bookingId);
}
