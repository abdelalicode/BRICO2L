package com.sneakpeak.bricool.offers;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sneakpeak.bricool.user.ClientReturnDTO;
import com.sneakpeak.bricool.worker.WorkerInfoDTO;
import com.sneakpeak.bricool.worker.WorkerReturnDTO;
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
public class OfferCityReturnDTO {

    private Long id;

    private String title;

    private String description;

    private LocalDate startDate;

    private LocalDate endDate;

    private BigDecimal hourlyRate;

    private boolean canceled;

    private WorkerInfoDTO worker;

    private ClientReturnDTO client;


}
