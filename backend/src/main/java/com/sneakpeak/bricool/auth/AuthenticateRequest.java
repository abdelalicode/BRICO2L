package com.sneakpeak.bricool.auth;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticateRequest {

    private String email;
    private String password;

}
