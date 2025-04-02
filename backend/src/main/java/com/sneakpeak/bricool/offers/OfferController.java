package com.sneakpeak.bricool.offers;

import com.sneakpeak.bricool.config.JwtService;
import com.sneakpeak.bricool.response.ResponseHandler;
import com.sneakpeak.bricool.user.User;
import com.sneakpeak.bricool.user.UserService;
import com.sneakpeak.bricool.worker.Worker;
import org.modelmapper.ModelMapper;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
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

    @GetMapping("/workeroffers")
    ResponseEntity<Object> getWorkerOffers(@RequestHeader("Authorization") String token) {
        String username = jwtService.extractUsername(token.replace("Bearer ", ""));
        Worker worker = userService.getWorker(username).orElse(null);

        assert worker != null;


        List <OfferCityReturnDTO> offers = worker.getOffers().stream()
                .map(offer -> modelMapper.map(offer, OfferCityReturnDTO.class))
                .sorted(Comparator.comparing(OfferCityReturnDTO::getStartDate).reversed())
                .toList();

        return ResponseHandler.responseBuilder("success", HttpStatus.OK, offers);

    }

    @PutMapping("/{offerId}")
    ResponseEntity<Object> cancelOffer(@PathVariable Long offerId) {

            if(offerService.cancelOffer(offerId)) {
                return ResponseHandler.responseBuilder("Offer cancelled", HttpStatus.OK, null);
            }
            return ResponseHandler.responseBuilder("Offer not found", HttpStatus.NOT_FOUND, null);

    }

    @GetMapping("/showbycity/{cityId}")
    ResponseEntity<Object> getOffersByCity(@PathVariable Long cityId) {

        List<Offer> offersByCity = offerService.getOffersByCity(cityId);

        List<OfferCityReturnDTO> offers = offersByCity.stream().map(offer -> modelMapper.map(offer, OfferCityReturnDTO.class)).toList();

        return ResponseHandler.responseBuilder("success", HttpStatus.OK, offers);
    }

    @GetMapping("/showbyjob/{jobId}")
    ResponseEntity<Object> getOffersByJob(@PathVariable Long jobId) {

        List<Offer> offersByJob = offerService.getOffersByJob(jobId);

        List<OfferCityReturnDTO> offers = offersByJob.stream().map(offer -> modelMapper.map(offer, OfferCityReturnDTO.class)).toList();

        return ResponseHandler.responseBuilder("success", HttpStatus.OK, offers);
    }

    @GetMapping
    ResponseEntity<Object> getOffers(@RequestParam(required = false) LocalDate offerDate,
                                     @RequestParam(required = false) Long cityId,
                                     @RequestParam(required = false) Long jobId)
                            {
                                return ResponseHandler.responseBuilder("Offers Searched", HttpStatus.OK, offerService.getOffers(offerDate, cityId, jobId).stream().map(offer -> modelMapper.map(offer, OfferCityReturnDTO.class)).toList());
                            }


     @PutMapping("/enrolloffer/{offerId}")
    ResponseEntity<Object> enrollOffer(@PathVariable Long offerId, @RequestHeader("Authorization") String token) {

         String username = jwtService.extractUsername(token.replace("Bearer ", ""));
         User client = userService.getClient(username);


         Offer offerAdded = offerService.enrollOffer(offerId, client);

         return ResponseHandler.responseBuilder("success", HttpStatus.CREATED, offerAdded);
     }
}
