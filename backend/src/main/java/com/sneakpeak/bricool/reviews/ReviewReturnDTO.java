package com.sneakpeak.bricool.reviews;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sneakpeak.bricool.user.User;
import com.sneakpeak.bricool.user.UserReturnDTO;
import com.sneakpeak.bricool.user.Worker;
import com.sneakpeak.bricool.user.WorkerReturnDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter

public class ReviewReturnDTO {

    private Long id;

    private int stars;

    private String content;

    @CreationTimestamp
    private LocalDateTime date;

    private UserReturnDTO client;


}
