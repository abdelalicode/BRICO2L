package com.sneakpeak.bricool.offers;

import org.springframework.stereotype.Service;

@Service
public class OfferService {
    private final OfferRepository offerRepository;

    public OfferService(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    public Offer addOffer(Offer offer) {
        return offerRepository.save(offer);
    }
}
