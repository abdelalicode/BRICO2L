package com.sneakpeak.bricool.requests;

import com.sneakpeak.bricool.config.JwtService;
import com.sneakpeak.bricool.response.ResponseHandler;
import com.sneakpeak.bricool.user.User;
import com.sneakpeak.bricool.user.UserService;
import com.sneakpeak.bricool.utils.EntityDtoMapper;
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

    public RequestController(ModelMapper modelMapper, JwtService jwtService, UserService userService, RequestService requestService, EntityDtoMapper entityDtoMapper) {
        this.modelMapper = modelMapper;
        this.jwtService = jwtService;
        this.userService = userService;
        this.requestService = requestService;
        this.entityDtoMapper = entityDtoMapper;
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


    ResponseEntity<Object> getRequestById(Long id) {
        return null;
    }

    ResponseEntity<Object> getRequestByCity(Long cityID) {
        return null;
    }

    ResponseEntity<Object> updateRequest(Long id, RequestDTO request) {
        return null;
    }


    ResponseEntity<Object> deleteRequest(Long id) {
        return null;
    }


}
