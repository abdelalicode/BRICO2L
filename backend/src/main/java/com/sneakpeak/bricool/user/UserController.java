package com.sneakpeak.bricool.user;

import com.sneakpeak.bricool.config.JwtService;
import com.sneakpeak.bricool.permission.PermissionService;
import com.sneakpeak.bricool.response.ResponseHandler;
import com.sneakpeak.bricool.utils.EntityDtoMapper;
import com.sneakpeak.bricool.worker.Worker;
import com.sneakpeak.bricool.worker.WorkerReturnDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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


    @PatchMapping("/update-role")
    public ResponseEntity<Object> updateRole(@Valid @RequestBody UserDTO userDTO, @RequestHeader("Authorization") String header) {

        String token = header.replace("Bearer ", "");

        String str = jwtService.extractUsername(token);

        User updatedUser = userService.updateUserRole(userDTO, str);

        UserReturnDTO createdUserDTO = mapper.mapToDto(updatedUser, UserReturnDTO.class);
        return ResponseHandler.responseBuilder("Updated successfully", HttpStatus.CREATED, createdUserDTO);
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Object> getAllUsers(HttpServletRequest request) {

        Optional<List<User>> allUsersOptional = userService.findAllUsers();
        if (allUsersOptional.isEmpty()) {
            return ResponseHandler.responseBuilder("All Users List", HttpStatus.OK, "No users found");
        } else {
            List<User> allUsers = allUsersOptional.get();
            List<UserReturnDTO> userDTOs = mapper.mapToEntityList(allUsers, UserReturnDTO.class);
            return ResponseHandler.responseBuilder("All Users List", HttpStatus.OK, userDTOs);
        }

    }


    @GetMapping("/workers")
    public ResponseEntity<Object> getAllWorkers(HttpServletRequest request) {

        System.out.println("Workers");

        List<User> allWorkers = userService.findAllWorkers();
        List<WorkerReturnDTO> userDTOs = mapper.mapToEntityList(allWorkers, WorkerReturnDTO.class);
        return ResponseHandler.responseBuilder("All Workers List", HttpStatus.OK, userDTOs);

    }

    @GetMapping("/worker/{id}")
    public ResponseEntity<Object> getWorker(@PathVariable Long id) {
        Optional<Worker> worker = userService.getWorker(id);
        if (worker.isPresent()) {
            WorkerReturnDTO workerDTO = mapper.mapToDto(worker.get(), WorkerReturnDTO.class);
            return ResponseHandler.responseBuilder("Worker", HttpStatus.OK, workerDTO);
        }
        return ResponseHandler.responseBuilder("Worker", HttpStatus.NOT_FOUND, "Worker not found");
    }

    @GetMapping("/authworker")
    @PreAuthorize("hasRole('ROLE_WORKER')")
    public ResponseEntity<Object> getAuthWorker(@RequestHeader("Authorization") String header) {
        String token = header.replace("Bearer ", "");

        String username = jwtService.extractUsername(token);
        Optional<Worker> worker = userService.getWorker(username);

        if (worker.isPresent()) {
            WorkerReturnDTO workerDTO = mapper.mapToDto(worker, WorkerReturnDTO.class);
            return ResponseHandler.responseBuilder("Worker", HttpStatus.OK, workerDTO);
        }
        return ResponseHandler.responseBuilder("Worker", HttpStatus.NOT_FOUND, "Worker not found");
    }


    @GetMapping("/client/")
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    public ResponseEntity<Object> getClient(@RequestHeader("Authorization") String header) {
        String token = header.replace("Bearer ", "");

        String username = jwtService.extractUsername(token);
        User client = userService.getClient(username);

        if (client != null) {
            UserReturnDTO userDTO = mapper.mapToDto(client, UserReturnDTO.class);
            return ResponseHandler.responseBuilder("Client", HttpStatus.OK, userDTO);
        }
        return ResponseHandler.responseBuilder("Client", HttpStatus.NOT_FOUND, "Client not found");
    }

    @GetMapping("/clienttoworker/{clientId}")
    ResponseEntity<Object> getClientToWorker(@PathVariable Long clientId) {
        Optional<User> clients = userService.getClientById(clientId);
        if (clients.isPresent()) {
            ClientReturnDTO clientDTOs = mapper.mapToEntity(clients.get(), ClientReturnDTO.class);
            return ResponseHandler.responseBuilder("Client", HttpStatus.OK, clientDTOs);
        }
        return ResponseHandler.responseBuilder("Client", HttpStatus.NOT_FOUND, "No workers found");
    }
}