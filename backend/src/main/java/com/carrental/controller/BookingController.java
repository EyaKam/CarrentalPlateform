package com.carrental.controller;

import com.carrental.model.Booking;
import com.carrental.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    // 1. Créer une nouvelle réservation
    @PostMapping
    public Booking bookCar(@RequestBody Booking booking) {
        booking.setBookingStatus("PENDING"); // Par défaut, la réservation est "En attente"
        return bookingRepository.save(booking);
    }

    // 2. Obtenir toutes les réservations (Pour l'admin ou le propriétaire)
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    // 3. Obtenir les réservations d'un utilisateur spécifique (Mes réservations)
    // Nous devrons ajouter une petite méthode dans le Repository pour que ça marche
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUserId(@PathVariable String userId) {
        return bookingRepository.findByUserId(userId);
    }
}