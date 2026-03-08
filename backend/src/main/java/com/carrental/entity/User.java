package com.carrental.entity;

import com.carrental.enums.UserRole;
import lombok.Data;
import org.springframework.data.annotation.Id; // L'import correct pour MongoDB
import org.springframework.data.mongodb.core.mapping.Document; // L'import correct pour MongoDB

@Data
@Document(collection = "users") // On dit à MongoDB que c'est un document
public class User {

    @Id // L'ID automatique de MongoDB
    private String id; // Attention : String, pas Long !

    private String name;
    
    private String email;
    
    private String password;

    private UserRole userRole;
}