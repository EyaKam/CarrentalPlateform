package com.carrental.services.booking;

import com.carrental.model.Booking;
import com.carrental.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    @Override
    public Booking createBooking(Booking booking) {
        if (booking.getBookingStatus() == null || booking.getBookingStatus().isEmpty()) {
            booking.setBookingStatus("PENDING");
        }
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Optional<Booking> getBookingById(String bookingId) {
        return bookingRepository.findById(bookingId);
    }

    @Override
    public List<Booking> getBookingsByUserId(String userId) {
        return bookingRepository.findByUserId(userId);
    }

    @Override
    public List<Booking> getBookingsByCarId(String carId) {
        // TODO: Ajouter la méthode findByCarId dans BookingRepository
        return bookingRepository.findByCarId(carId);
    }

    @Override
    public Booking confirmBooking(String bookingId) {
        Optional<Booking> booking = bookingRepository.findById(bookingId);
        if (booking.isPresent()) {
            Booking b = booking.get();
            b.setBookingStatus("CONFIRMED");
            return bookingRepository.save(b);
        }
        return null;
    }

    @Override
    public Booking rejectBooking(String bookingId) {
        Optional<Booking> booking = bookingRepository.findById(bookingId);
        if (booking.isPresent()) {
            Booking b = booking.get();
            b.setBookingStatus("REJECTED");
            return bookingRepository.save(b);
        }
        return null;
    }

    @Override
    public Booking cancelBooking(String bookingId) {
        Optional<Booking> booking = bookingRepository.findById(bookingId);
        if (booking.isPresent()) {
            Booking b = booking.get();
            b.setBookingStatus("CANCELLED");
            return bookingRepository.save(b);
        }
        return null;
    }

    @Override
    public void deleteBooking(String bookingId) {
        bookingRepository.deleteById(bookingId);
    }
}
