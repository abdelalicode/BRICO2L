package com.sneakpeak.bricool.worker;

import com.sneakpeak.bricool.city.City;
import com.sneakpeak.bricool.offers.OfferDTO;
import com.sneakpeak.bricool.offers.OfferReturnDTO;
import com.sneakpeak.bricool.profession.Profession;
import com.sneakpeak.bricool.profession.ProfessionReturnDTO;
import com.sneakpeak.bricool.reviews.ReviewReturnDTO;
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
    private ProfessionReturnDTO profession;
    private City city;
    private List<ReviewReturnDTO> reviews;
    private List<OfferReturnDTO> offers;
    private boolean available;
}
