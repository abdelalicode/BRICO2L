package com.sneakpeak.bricool.utils;

import com.sneakpeak.bricool.permission.Permission;
import com.sneakpeak.bricool.permission.PermissionRepository;
import com.sneakpeak.bricool.permission.PermissionType;
import com.sneakpeak.bricool.role.Role;
import com.sneakpeak.bricool.role.RoleRepository;
import com.sneakpeak.bricool.role.RoleType;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class RolePermissionsLoader implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    public RolePermissionsLoader(RoleRepository roleRepository, PermissionRepository permissionRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if(roleRepository.count() == 0 ) {
            for (PermissionType permissionType : PermissionType.values()) {
                Permission permission = new Permission();
                permission.setName(permissionType);
                permissionRepository.save(permission);
            }
            Role adminRole = new Role();
            adminRole.setName(RoleType.ADMIN);
            adminRole.setPermissions(Arrays.asList(
                    permissionRepository.findByName(PermissionType.CREATE_MANAGE_CATEGORIES),
                    permissionRepository.findByName(PermissionType.MANAGE_USERS),
                    permissionRepository.findByName(PermissionType.VIEW_PLATFORM_STATS)
            ));
            roleRepository.save(adminRole);

            Role employeeRole = new Role();
            employeeRole.setName(RoleType.WORKER);
            employeeRole.setPermissions(Arrays.asList(
                    permissionRepository.findByName(PermissionType.VIEW_OFFERS),
                    permissionRepository.findByName(PermissionType.ACCEPT_REJECT_OFFERS),
                    permissionRepository.findByName(PermissionType.VIEW_PARTICIPATION_HISTORY)
            ));
            roleRepository.save(employeeRole);

            Role clientRole = new Role();
            clientRole.setName(RoleType.CLIENT);
            clientRole.setPermissions(Arrays.asList(
                    permissionRepository.findByName(PermissionType.VIEW_JOBS),
                    permissionRepository.findByName(PermissionType.SUBMIT_REQUEST),
                    permissionRepository.findByName(PermissionType.CANCEL_REQUEST)
            ));
            roleRepository.save(clientRole);
        }

    }
}
