package com.sneakpeak.bricool.user;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ClientReturnDTO {

    private  Long id;

    private String firstName;

    private String lastName;

    private Integer age;

    private String email;

    private String phone;


}
