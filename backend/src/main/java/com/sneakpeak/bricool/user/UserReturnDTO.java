package com.sneakpeak.bricool.user;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Setter
@Getter
public class UserReturnDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private Integer age;
    private String roleName;
//    private List<String> ui;
}
