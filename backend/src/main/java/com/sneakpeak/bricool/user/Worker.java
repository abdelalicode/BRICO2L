package com.sneakpeak.bricool.user;

import com.sneakpeak.bricool.city.City;
import com.sneakpeak.bricool.profession.Profession;
import com.sneakpeak.bricool.reviews.Review;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@DiscriminatorValue("worker")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Worker extends User {

        @ManyToOne
        @JoinColumn(name = "profession_id")
        private Profession profession;


        @ManyToOne
        @JoinColumn(name = "city_id")
        private City city;

        @OneToMany(mappedBy = "worker")
        private List<Review> reviews;


}
