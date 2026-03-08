package com.carrental.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data // Cela génère automatiquement le code ennuyeux (getters/setters)
@Document(collection = "users") // Cela dit à MongoDB de créer une table "users"
public class User {
    
    @Id
    private String id; // L'identifiant unique de l'utilisateur
    
    private String name;
    private String email;
    private String password;
    private String image; // L'URL de la photo de profil
    
    // Si true, l'utilisateur peut mettre des voitures en location
    private boolean isOwner = false; 
}