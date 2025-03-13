package com.sneakpeak.bricool.user;

import com.sneakpeak.bricool.city.City;
import com.sneakpeak.bricool.profession.Profession;
import com.sneakpeak.bricool.reviews.Review;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;


@Setter
@Getter
public class WorkerReturnDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDateTime memberSince;
    private Profession profession;
    private City city;
    private List<Review> reviews;
}
