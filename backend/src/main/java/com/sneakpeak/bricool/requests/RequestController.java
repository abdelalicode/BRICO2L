package com.sneakpeak.bricool.requests;

import com.sneakpeak.bricool.config.JwtService;
import com.sneakpeak.bricool.exception.NotFoundException;
import com.sneakpeak.bricool.response.ResponseHandler;
import com.sneakpeak.bricool.user.User;
import com.sneakpeak.bricool.user.UserService;
import com.sneakpeak.bricool.utils.EntityDtoMapper;
import com.sneakpeak.bricool.worker.Worker;
import com.sneakpeak.bricool.worker.WorkerService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
public class RequestController {


    private final ModelMapper modelMapper;
    private final JwtService jwtService;
    private final UserService userService;
    private final RequestService requestService;
    private final EntityDtoMapper entityDtoMapper;
    private final WorkerService workerService;

    public RequestController(ModelMapper modelMapper, JwtService jwtService, UserService userService, RequestService requestService, EntityDtoMapper entityDtoMapper, WorkerService workerService) {
        this.modelMapper = modelMapper;
        this.jwtService = jwtService;
        this.userService = userService;
        this.requestService = requestService;
        this.entityDtoMapper = entityDtoMapper;
        this.workerService = workerService;
    }

    @PostMapping
    ResponseEntity<Object> createRequest(@RequestBody  RequestDTO requestDTO, @RequestHeader("Authorization") String header) {

        String token = header.replace("Bearer ", "");

        System.out.println(requestDTO);

        String username = jwtService.extractUsername(token);
        User client = userService.getClient(username);

        Request requestE = modelMapper.map(requestDTO, Request.class);
        requestE.setClient(client);
        Request requestCreated = requestService.createRequest(requestE);

        RequestReturnDTO requestReturnDTO = modelMapper.map(requestCreated, RequestReturnDTO.class);

        return ResponseHandler.responseBuilder("Request created successfully", HttpStatus.CREATED, requestReturnDTO);
    }

    @GetMapping
    ResponseEntity<Object> getAllRequests() {
        List<Request> all =  requestService.getAllRequests();
        List<RequestReturnDTO> allDTO = entityDtoMapper.mapToDtoList(all, RequestReturnDTO.class);
        return ResponseHandler.responseBuilder("All requests", HttpStatus.OK, allDTO);
    }



    ResponseEntity<Object> getRequestByCity(Long cityID) {
        return null;
    }

    @PutMapping("/takerequest/{id}")
    ResponseEntity<Object> takeRequest(@PathVariable Long id, @RequestHeader("Authorization") String header) {
        String token = header.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);
        Worker user = workerService.getWorker(username).orElseThrow(() -> new NotFoundException("Worker not found"));

        if(requestService.takeRequest(id, user)) {
            return ResponseHandler.responseBuilder("Request taken successfully", HttpStatus.OK, null);
        }

        return ResponseHandler.errorBuilder("Request not taken", HttpStatus.BAD_REQUEST);
    }



}
