package com.sneakpeak.bricool.requests;

import com.sneakpeak.bricool.city.City;
import com.sneakpeak.bricool.city.CityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {
    private final RequestRepository requestRepository;
    private final CityRepository cityRepository;

    public RequestService(RequestRepository requestRepository, CityRepository cityRepository) {
        this.requestRepository = requestRepository;
        this.cityRepository = cityRepository;
    }


    public Request createRequest(Request request) {

        List<City> allCities = cityRepository.findAll();


        if(allCities.stream().noneMatch(city -> city.getName().equalsIgnoreCase(request.getCity()))) {
            throw new IllegalArgumentException("City has to be one of the following: " + allCities);
        }

        return requestRepository.save(request);

    }

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }
}
