package com.sneakpeak.bricool.permission;

import com.sneakpeak.bricool.user.User;
import com.sneakpeak.bricool.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class  PermissionService {

    private UserRepository userRepository;

    public PermissionService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public boolean hasPermission(Long userId, PermissionType permission) {
        User user = userRepository.findById(userId).orElse(null);

        if(user == null || user.getRole() == null){
            return false;
        }

        return user.getRole().getPermissions().stream()
                .anyMatch(p -> p.getName().equals(permission));

    }
}
