package com.sneakpeak.bricool.offers;

import com.sneakpeak.bricool.config.JwtService;
import com.sneakpeak.bricool.response.ResponseHandler;
import com.sneakpeak.bricool.user.UserService;
import com.sneakpeak.bricool.worker.Worker;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/offers")
public class OfferController {


    private final ModelMapper modelMapper;
    private final OfferService offerService;
    private final JwtService jwtService;
    private final UserService userService;

    public OfferController(ModelMapper modelMapper, OfferService offerService, JwtService jwtService, UserService userService) {
        this.modelMapper = modelMapper;
        this.offerService = offerService;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @PostMapping
    ResponseEntity<Object> addOffer(@RequestBody OfferDTO offerDTO, @RequestHeader("Authorization") String token) {

        String username = jwtService.extractUsername(token.replace("Bearer ", ""));
        Worker worker = userService.getWorker(username).orElse(null);

        Offer offer = modelMapper.map(offerDTO, Offer.class);

        if(worker != null) {
            offer.setWorker(worker);
        }

        Offer offerAdded = offerService.addOffer(offer);

        return ResponseHandler.responseBuilder("success", HttpStatus.CREATED, offerAdded);

    }
}
