package com.sneakpeak.bricool.requests;

import com.sneakpeak.bricool.user.ClientReturnDTO;
import com.sneakpeak.bricool.worker.WorkerDashBoardReturnDTO;
import com.sneakpeak.bricool.worker.WorkerInfoDTO;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class RequestClientDTO {

    private Long id;

    private String city;

    private String description;

    private LocalDateTime created_at;

    private LocalDateTime updated_at;

    private boolean isAccepted;

    private boolean status;

    private WorkerInfoDTO worker;
}
