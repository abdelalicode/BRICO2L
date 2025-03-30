package com.sneakpeak.bricool.reviews;

import com.sneakpeak.bricool.user.User;
import com.sneakpeak.bricool.worker.Worker;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReviewDTO {
    private int stars;

    private String content;


}
