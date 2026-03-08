package com.carrental.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "cars")
public class Car {

    @Id
    private String id;

    private String brand;         // Ex: BMW
    private String model;         // Ex: M4 Competition
    
    private int year;             // NOUVEAU (Ex: 2021)
    
    private String transmission;  // Ex: Automatic
    private String fuelType;      // Ex: Petrol
    
    private int seats;            // NOUVEAU (Ex: 4)
    
    private double pricePerDay;   // Ex: 399.0
    private String location;      // NOUVEAU (Ex: Los Angeles)
    private String description;   // NOUVEAU (Texte long)
    
    private String image;         // URL de l'image
    
    private String userId;        // Le propriétaire
}