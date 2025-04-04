package com.sneakpeak.bricool.config;

import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import static com.sneakpeak.bricool.role.RoleType.ADMIN;
import static com.sneakpeak.bricool.role.RoleType.WORKER;
import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.authorization.AuthenticatedAuthorizationManager.anonymous;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true
)

public class SecurityConfiguration {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final CustomAccessDeniedHandler accessDeniedHandler;
    private static final String[] WHITE_LIST_URL = {"/auth/**", "/cities/**", "/professions/**", "/offers", "/reviews"};
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                .requestMatchers(WHITE_LIST_URL)
                                .permitAll()
                                .requestMatchers("/api/v1/worker/**").hasAnyRole(ADMIN.name(), WORKER.name())
                                .anyRequest()
                                .authenticated()
                )
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling.accessDeniedHandler(accessDeniedHandler)
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
