package com.sneakpeak.bricool.offers;

import com.sneakpeak.bricool.user.User;
import com.sneakpeak.bricool.worker.Worker;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
public class OfferService {
    private final OfferRepository offerRepository;

    public OfferService(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    public Offer addOffer(Offer offer) {
        return offerRepository.save(offer);
    }

    public boolean cancelOffer(Long offerId) {
        Offer offer = offerRepository.findById(offerId).orElse(null);

        if(offer != null) {
            offer.setCanceled(true);
            offerRepository.save(offer);
            return true;
        }
        return false;
    }

    public List<Offer> getOffersByCity(Long cityId) {
        return offerRepository.findByCity(cityId);
    }

    public List<Offer> getOffersByJob(Long jobId) {
        return offerRepository.findByJob(jobId);
    }


    public List<Offer> getOffers(LocalDate offerDate, Long cityId, Long jobId) {
        return offerRepository.findAll((Specification<Offer>) (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            if (Objects.nonNull(offerDate)) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.and(
                                criteriaBuilder.lessThanOrEqualTo(root.get("startDate"), offerDate),
                                criteriaBuilder.greaterThanOrEqualTo(root.get("endDate"), offerDate)
                        )
                );
            }

            if (Objects.nonNull(cityId)) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(root.get("worker").get("city").get("id"), cityId)
                );
            }

            if (Objects.nonNull(jobId)) {
                predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(root.get("worker").get("profession").get("id"), jobId)
                );
            }

            return predicate;

        });

}

    public Offer enrollOffer(Long offerId, User client) {
        Offer offer = offerRepository.findById(offerId).orElse(null);

        if(offer != null) {
            offer.setClient(client);
            offerRepository.save(offer);
            return offer;
        }
        return null;
    }
}