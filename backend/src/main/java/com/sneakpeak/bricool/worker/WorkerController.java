package com.sneakpeak.bricool.worker;

import com.sneakpeak.bricool.config.JwtService;
import com.sneakpeak.bricool.response.ResponseHandler;
import com.sneakpeak.bricool.user.User;
import com.sneakpeak.bricool.user.UserReturnDTO;
import com.sneakpeak.bricool.user.UserService;
import com.sneakpeak.bricool.utils.EntityDtoMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/workers")
public class WorkerController {

    private final WorkerService workerService;
    private final EntityDtoMapper mapper;
    private final JwtService jwtService;
    private final UserService userService;


    public WorkerController(WorkerService workerService, EntityDtoMapper mapper, JwtService jwtService, UserService userService) {
        this.workerService = workerService;
        this.mapper = mapper;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @PatchMapping("/update-wokerprofile")
    public ResponseEntity<Object> updateWorker(@Valid @RequestBody WorkerInfoDTO workerDTO, @RequestHeader("Authorization") String header) {

        System.out.println(workerDTO);

        String token = header.replace("Bearer ", "");

            String str = jwtService.extractUsername(token);

            Worker updatedUser = workerService.updateWorker(workerDTO, str);

            UserReturnDTO createdUserDTO = mapper.mapToDto(updatedUser, UserReturnDTO.class);
            return ResponseHandler.responseBuilder("Updated successfully", HttpStatus.CREATED, createdUserDTO);
    }


    @GetMapping
    public ResponseEntity<Object> getAllWorkers(HttpServletRequest request) {
        List<User> allWorkers = userService.findAllWorkers();
        List<WorkerReturnDTO> userDTOs = mapper.mapToEntityList(allWorkers, WorkerReturnDTO.class);
        return ResponseHandler.responseBuilder("All Workers List", HttpStatus.OK, userDTOs);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getWorker(@PathVariable Long id) {
        Optional<Worker> worker = userService.getWorker(id);
        if(worker.isPresent()) {
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

        if(worker.isPresent()) {
            WorkerReturnDTO workerDTO = mapper.mapToDto(worker, WorkerReturnDTO.class);
            return ResponseHandler.responseBuilder("Worker", HttpStatus.OK, workerDTO);
        }
        return ResponseHandler.responseBuilder("Worker", HttpStatus.NOT_FOUND, "Worker not found");
    }





}