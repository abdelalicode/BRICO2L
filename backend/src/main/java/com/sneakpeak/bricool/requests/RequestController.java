package com.sneakpeak.bricool.requests;

import com.sneakpeak.bricool.config.JwtService;
import com.sneakpeak.bricool.response.ResponseHandler;
import com.sneakpeak.bricool.user.User;
import com.sneakpeak.bricool.user.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/requests")
public class RequestController {


    private final ModelMapper modelMapper;
    private final JwtService jwtService;
    private final UserService userService;
    private final RequestService requestService;

    public RequestController(ModelMapper modelMapper, JwtService jwtService, UserService userService, RequestService requestService) {
        this.modelMapper = modelMapper;
        this.jwtService = jwtService;
        this.userService = userService;
        this.requestService = requestService;
    }

    @PostMapping
    ResponseEntity<Object> createRequest(@RequestBody  RequestDTO requestDTO, @RequestHeader("Authorization") String header) {

        String token = header.replace("Bearer ", "");

        System.out.println(requestDTO);

        String username = jwtService.extractUsername(token);
        User client = userService.getClient(username);

        Request requestE = modelMapper.map(requestDTO, Request.class);


        Request requestCreated = requestService.createRequest(requestE);

        RequestReturnDTO requestReturnDTO = modelMapper.map(requestCreated, RequestReturnDTO.class);

        return ResponseHandler.responseBuilder("Request created successfully", HttpStatus.CREATED, requestReturnDTO);
    }

    ResponseEntity<Object> getAllRequests() {
        return null;
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
