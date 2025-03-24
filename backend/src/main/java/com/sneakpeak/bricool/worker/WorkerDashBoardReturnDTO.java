package com.sneakpeak.bricool.worker;

import com.sneakpeak.bricool.city.City;
import com.sneakpeak.bricool.profession.Profession;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Setter
@Getter
public class WorkerDashBoardReturnDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDateTime memberSince;
    private Profession profession;
    private City city;
    private boolean available;
}
