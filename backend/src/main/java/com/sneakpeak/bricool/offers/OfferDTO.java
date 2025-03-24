package com.sneakpeak.bricool.offers;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sneakpeak.bricool.user.User;
import com.sneakpeak.bricool.worker.Worker;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OfferDTO {

    private String title;

    private String description;

    @JsonProperty("start_date")
    private LocalDate startDate;

    @JsonProperty("end_date")
    private LocalDate endDate;

    @JsonProperty("hourly_rate")
    private BigDecimal hourlyRate;


}
