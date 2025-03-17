package com.sneakpeak.bricool.requests;

import com.sneakpeak.bricool.user.ClientReturnDTO;
import com.sneakpeak.bricool.user.User;
import com.sneakpeak.bricool.user.WorkerDashBoardReturnDTO;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class RequestReturnDTO {

    private Long id;

    private String city;

    private String description;

    private LocalDateTime created_at;

    private ClientReturnDTO client;

    private WorkerDashBoardReturnDTO worker;
}
