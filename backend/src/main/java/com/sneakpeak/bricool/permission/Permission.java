package com.sneakpeak.bricool.permission;

import com.sneakpeak.bricool.role.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private PermissionType name;


    @ManyToMany(mappedBy = "permissions")
    private List<Role> roles = new ArrayList<>();

}
