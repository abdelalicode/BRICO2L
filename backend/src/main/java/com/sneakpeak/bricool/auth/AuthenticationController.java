package com.sneakpeak.bricool.auth;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

        private final AuthenticationService authenticationService;


        @PostMapping("/register")
        public ResponseEntity<AuthenticationResponse> register(
                @RequestBody RegisterRequest request
        ) {
                return ResponseEntity.ok(authenticationService.register(request));
        }


        @PostMapping("/authenticate")
        public ResponseEntity<AuthenticationResponse> authenticate(
                @RequestBody AuthenticateRequest request
        ) {
                return ResponseEntity.ok(authenticationService.authenticate(request));

        }


        @PostMapping("/logout")
        public ResponseEntity<?> logout() {
                return ResponseEntity.ok("Logout successful");
        }


        @PostMapping("/public")
        public String publicEndPoint() {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                        return "Principal: " + authentication.getPrincipal().toString();

        }



}
