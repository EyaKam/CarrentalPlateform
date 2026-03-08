package com.carrental.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "bookings")
public class Booking {

    @Id
    private String id;

    private Date startDate;
    private Date endDate;
    private double totalPrice;
    
    private String bookingStatus; // Ex: "PENDING", "CONFIRMED", "REJECTED"

    private String userId; // Qui a réservé ?
    private String carId;  // Quelle voiture ?
}