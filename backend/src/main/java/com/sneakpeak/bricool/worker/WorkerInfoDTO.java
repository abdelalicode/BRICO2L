package com.sneakpeak.bricool.worker;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class WorkerInfoDTO {


    @Email
    private String email;

    @JsonProperty("city_id")
    private Long cityId;

    @JsonProperty("job_id")
    private Long professionId;

}
