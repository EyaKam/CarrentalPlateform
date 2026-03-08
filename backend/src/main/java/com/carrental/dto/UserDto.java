package com.carrental.dto;

import com.carrental.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private String id; // Changé en String pour coller à MongoDB
    private String name;
    private String email;
    private UserRole userRole;
}