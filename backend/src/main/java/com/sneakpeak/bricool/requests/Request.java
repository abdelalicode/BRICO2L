package com.sneakpeak.bricool.requests;
import com.sneakpeak.bricool.user.User;
import com.sneakpeak.bricool.user.Worker;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String city;

    private String description;

    @CreationTimestamp
    private LocalDateTime created_at;

    @Column(columnDefinition = "boolean default false")
    private boolean isAccepted;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private User client;

    @ManyToOne
    @JoinColumn(name = "worker_id", nullable = true)
    private Worker worker;


}
