package com.sneakpeak.bricool.reviews;

import com.sneakpeak.bricool.user.UserReturnDTO;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter

public class ReviewClientDTO {

    private Long id;

    private int stars;

    private String content;

    @CreationTimestamp
    private LocalDateTime date;


}
