package com.sneakpeak.bricool.worker;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sneakpeak.bricool.city.City;
import com.sneakpeak.bricool.profession.Profession;
import com.sneakpeak.bricool.reviews.Review;
import com.sneakpeak.bricool.user.User;
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

        @Column(columnDefinition = "boolean default true")
        private boolean available;

        @ManyToOne
        @JoinColumn(name = "profession_id")
        private Profession profession;


        @ManyToOne
        @JoinColumn(name = "city_id")
        private City city;

        @OneToMany(mappedBy = "worker")
        @JsonManagedReference
        private List<Review> reviews;


        @Override
        public String toString() {
                return "Worker{" +
                        "city=" + city +
                        ", profession=" + profession +
                        ", available=" + available +
                        '}';
        }
}
