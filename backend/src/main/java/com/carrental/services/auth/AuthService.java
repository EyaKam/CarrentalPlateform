package com.carrental.services.auth;

import com.carrental.dto.SignupRequest;
import com.carrental.dto.UserDto;

public interface AuthService {
    UserDto createCustomer(SignupRequest signupRequest);
    boolean hasCustomerWithEmail(String email);
}