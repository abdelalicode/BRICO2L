package com.sneakpeak.bricool.profession;

import com.sneakpeak.bricool.worker.Worker;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProfessionReturnDTO {


    private Long id;

    private String type;


}
