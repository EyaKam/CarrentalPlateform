package com.carrental.controller;

import com.carrental.dto.AuthenticationRequest;
import com.carrental.dto.SignupRequest;
import com.carrental.dto.UserDto;
import com.carrental.entity.User;
import com.carrental.repository.UserRepository;
import com.carrental.services.auth.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository; // Ajout direct du repo pour simplifier le login

    @PostMapping("/register")
    public ResponseEntity<?> signupUser(@RequestBody SignupRequest signupRequest) {
        if(authService.hasCustomerWithEmail(signupRequest.getEmail()))
            return new ResponseEntity<>("L'email existe déjà", HttpStatus.NOT_ACCEPTABLE);

        UserDto createdUser = authService.createCustomer(signupRequest);
        if (createdUser == null) {
            return new ResponseEntity<>("Utilisateur non créé", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) {
        // 1. Chercher l'utilisateur
        Optional<User> optionalUser = userRepository.findFirstByEmail(authenticationRequest.getEmail());

        // 2. Vérifier s'il existe et si le mot de passe correspond
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getPassword().equals(authenticationRequest.getPassword())) {
                // 3. Succès ! On renvoie l'utilisateur (ou son ID/Role)
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
        }
        
        // 4. Échec
        return new ResponseEntity<>("Email ou mot de passe incorrect", HttpStatus.UNAUTHORIZED);
    }
}