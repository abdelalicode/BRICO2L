package com.sneakpeak.bricool.user;

import com.sneakpeak.bricool.config.JwtService;
import com.sneakpeak.bricool.permission.PermissionService;
import com.sneakpeak.bricool.permission.PermissionType;
import com.sneakpeak.bricool.response.ResponseHandler;
import com.sneakpeak.bricool.utils.EntityDtoMapper;
import com.sneakpeak.bricool.utils.TokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final EntityDtoMapper mapper;
    private final PermissionService permissionService;
    private final JwtService jwtService;


    public UserController(UserService userService, EntityDtoMapper mapper, PermissionService permissionService, JwtService jwtService) {
        this.userService = userService;
        this.mapper = mapper;
        this.permissionService = permissionService;
        this.jwtService = jwtService;
    }

    @PatchMapping("/update-profile")
    public ResponseEntity<Object> updateUser(@Valid @RequestBody UserDTO userDTO, @RequestHeader("Authorization") String header) {
            User userInfos = mapper.mapToEntity(userDTO, User.class);

            String token = header.replace("Bearer ", "");

            String str = jwtService.extractUsername(token);

            User updatedUser = userService.updateUser(userInfos, str);

            UserReturnDTO createdUserDTO = mapper.mapToDto(updatedUser, UserReturnDTO.class);
            return ResponseHandler.responseBuilder("Updated successfully", HttpStatus.CREATED, createdUserDTO);
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Object> getAllUsers(HttpServletRequest request) {

            Optional<List<User>> allUsersOptional = userService.findAllUsers();
            if(allUsersOptional.isEmpty()) {
                return ResponseHandler.responseBuilder("All Users List", HttpStatus.OK, "No users found");
            }
            else  {
                List<User> allUsers = allUsersOptional.get();
                List<UserReturnDTO> userDTOs = mapper.mapToEntityList(allUsers, UserReturnDTO.class);
                return ResponseHandler.responseBuilder("All Users List", HttpStatus.OK, userDTOs);
            }

    }


}