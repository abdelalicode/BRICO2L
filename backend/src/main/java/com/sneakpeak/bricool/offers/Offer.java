package com.sneakpeak.bricool.offers;

import com.sneakpeak.bricool.user.User;
import com.sneakpeak.bricool.worker.Worker;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Offer {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private String description;

    private LocalDate startDate;

    private LocalDate endDate;

    @Column(columnDefinition = "boolean default false")
    private boolean canceled;

    @Column(precision = 4, scale = 2)
    private BigDecimal hourlyRate;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private User client ;

    @ManyToOne
    @JoinColumn(name = "worker_id")
    private Worker worker;
}
