package com.carrental.controller;

import com.carrental.model.Booking;
import com.carrental.services.booking.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // 1. Créer une nouvelle réservation
    @PostMapping
    public ResponseEntity<?> bookCar(@RequestBody Booking booking) {
        try {
            Booking createdBooking = bookingService.createBooking(booking);
            return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la création de la réservation", HttpStatus.BAD_REQUEST);
        }
    }

    // 2. Obtenir toutes les réservations (Pour l'admin ou le propriétaire)
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    // 3. Obtenir une réservation par ID
    @GetMapping("/{bookingId}")
    public ResponseEntity<?> getBookingById(@PathVariable String bookingId) {
        Optional<Booking> booking = bookingService.getBookingById(bookingId);
        if (booking.isPresent()) {
            return new ResponseEntity<>(booking.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>("Réservation non trouvée", HttpStatus.NOT_FOUND);
    }
    
    // 4. Obtenir les réservations d'un utilisateur spécifique (Mes réservations)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUserId(@PathVariable String userId) {
        List<Booking> bookings = bookingService.getBookingsByUserId(userId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    // 5. Obtenir les réservations d'une voiture
    @GetMapping("/car/{carId}")
    public ResponseEntity<List<Booking>> getBookingsByCarId(@PathVariable String carId) {
        List<Booking> bookings = bookingService.getBookingsByCarId(carId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    // 6. Confirmer une réservation
    @PutMapping("/{bookingId}/confirm")
    public ResponseEntity<?> confirmBooking(@PathVariable String bookingId) {
        try {
            Booking confirmedBooking = bookingService.confirmBooking(bookingId);
            if (confirmedBooking != null) {
                return new ResponseEntity<>(confirmedBooking, HttpStatus.OK);
            }
            return new ResponseEntity<>("Réservation non trouvée", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la confirmation", HttpStatus.BAD_REQUEST);
        }
    }

    // 7. Rejeter une réservation
    @PutMapping("/{bookingId}/reject")
    public ResponseEntity<?> rejectBooking(@PathVariable String bookingId) {
        try {
            Booking rejectedBooking = bookingService.rejectBooking(bookingId);
            if (rejectedBooking != null) {
                return new ResponseEntity<>(rejectedBooking, HttpStatus.OK);
            }
            return new ResponseEntity<>("Réservation non trouvée", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors du rejet", HttpStatus.BAD_REQUEST);
        }
    }

    // 8. Annuler une réservation
    @PutMapping("/{bookingId}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable String bookingId) {
        try {
            Booking cancelledBooking = bookingService.cancelBooking(bookingId);
            if (cancelledBooking != null) {
                return new ResponseEntity<>(cancelledBooking, HttpStatus.OK);
            }
            return new ResponseEntity<>("Réservation non trouvée", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de l'annulation", HttpStatus.BAD_REQUEST);
        }
    }

    // 9. Supprimer une réservation (admin only)
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> deleteBooking(@PathVariable String bookingId) {
        try {
            bookingService.deleteBooking(bookingId);
            return new ResponseEntity<>("Réservation supprimée avec succès", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la suppression", HttpStatus.BAD_REQUEST);
        }
    }
}