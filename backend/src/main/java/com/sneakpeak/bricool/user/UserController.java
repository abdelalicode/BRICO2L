package com.sneakpeak.bricool.user;

import com.sneakpeak.bricool.permission.PermissionService;
import com.sneakpeak.bricool.permission.PermissionType;
import com.sneakpeak.bricool.response.ResponseHandler;
import com.sneakpeak.bricool.utils.EntityDtoMapper;
import com.sneakpeak.bricool.utils.TokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final EntityDtoMapper mapper;
    private final TokenUtil tokenUtil;
    private final PermissionService permissionService;


    public UserController(UserService userService, EntityDtoMapper mapper, TokenUtil tokenUtil, PermissionService permissionService) {
        this.userService = userService;
        this.mapper = mapper;
        this.tokenUtil = tokenUtil;
        this.permissionService = permissionService;
    }

    @PostMapping("/{id}/update")
    public ResponseEntity<Object> updateUser(@Valid @RequestBody UserDTO userDTO, @PathVariable long id, HttpServletRequest request) {
        String token = (String) request.getAttribute("token");
        Long authId = (Long) request.getAttribute("userId");


        if( authId == id || permissionService.hasPermission(authId, PermissionType.MANAGE_USERS)) {
            User user = mapper.mapToEntity(userDTO, User.class);

            User updatedUser = userService.updateUser(user, id);
            UserReturnDTO createdUserDTO = mapper.mapToDto(updatedUser, UserReturnDTO.class);
            return ResponseHandler.responseBuilder("Updated successfully", HttpStatus.CREATED, createdUserDTO);
        }
        else {
//            throw new UnAuthorizedException("You are not allowed");
            return null;
        }



    }

    @GetMapping
    public ResponseEntity<Object> getAllUsers(HttpServletRequest request) {
        String token = (String) request.getAttribute("token");
        Long authId = (Long) request.getAttribute("userId");

//        if(permissionService.hasPermission(authId, PermissionType.MANAGE_USERS) || permissionService.hasPermission(authId, PermissionType.MANAGE_USERS)) {
//
//            Optional<List<User>> allUsersOptional = userService.findAllUsers();
//            if(allUsersOptional.isEmpty()) {
//                return ResponseHandler.responseBuilder("All Users List", HttpStatus.OK, "No users found");
//            }
//            else  {
//                List<User> allUsers = allUsersOptional.get();
//                List<UserReturnDTO> userDTOs = mapper.mapToEntityList(allUsers, UserReturnDTO.class);
//                return ResponseHandler.responseBuilder("All Users List", HttpStatus.OK, userDTOs);
//            }
//        }
//        else {
////            throw new UnAuthorizedException("You are not allowed");
//            return null;
//        }
        return null;
    }


}