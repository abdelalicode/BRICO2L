package com.sneakpeak.bricool.auth;

import com.sneakpeak.bricool.role.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    private String firstName;
    private String lastName;
    private Integer age;
    private String email;
    private String password;
    private String phone;
    private Role role;
}
