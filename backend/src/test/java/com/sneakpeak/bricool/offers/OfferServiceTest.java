package com.sneakpeak.bricool.offers;

import com.sneakpeak.bricool.user.User;
import com.sneakpeak.bricool.worker.Worker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OfferServiceTest {

    @Mock
    private OfferRepository offerRepository;

    @InjectMocks
    private OfferService offerService;

    private Offer offer;
    private User client;
    private Worker worker;

    @BeforeEach
    void setUp() {
        worker = new Worker();
        worker.setId(1L);

        client = new User();
        client.setId(2L);

        offer = new Offer();
        offer.setId(1L);
        offer.setWorker(worker);
        offer.setStartDate(LocalDate.now());
        offer.setEndDate(LocalDate.now().plusDays(7));
        offer.setCanceled(false);
    }

    @Test
    void addOffer_ShouldReturnSavedOffer() {

        when(offerRepository.save(any(Offer.class))).thenReturn(offer);

        Offer result = offerService.addOffer(offer);

        assertNotNull(result);
        assertEquals(offer.getId(), result.getId());
        verify(offerRepository, times(1)).save(offer);
    }

    @Test
    void cancelOffer_WhenOfferExists_ShouldReturnTrue() {
        when(offerRepository.findById(1L)).thenReturn(Optional.of(offer));
        when(offerRepository.save(any(Offer.class))).thenReturn(offer);

        boolean result = offerService.cancelOffer(1L);

        assertTrue(result);
        assertTrue(offer.isCanceled());
        verify(offerRepository).findById(1L);
        verify(offerRepository).save(offer);
    }

    @Test
    void cancelOffer_WhenOfferDoesNotExist_ShouldReturnFalse() {
        when(offerRepository.findById(1L)).thenReturn(Optional.empty());

        boolean result = offerService.cancelOffer(1L);

        assertFalse(result);
        verify(offerRepository).findById(1L);
        verify(offerRepository, never()).save(any(Offer.class));
    }

    @Test
    void getOffersByCity_ShouldReturnOffersList() {
        List<Offer> offers = Arrays.asList(offer);
        when(offerRepository.findByCity(1L)).thenReturn(offers);

        List<Offer> result = offerService.getOffersByCity(1L);

        assertEquals(1, result.size());
        assertEquals(offer, result.get(0));
        verify(offerRepository).findByCity(1L);
    }

    @Test
    void getOffersByJob_ShouldReturnOffersList() {
        List<Offer> offers = Arrays.asList(offer);
        when(offerRepository.findByJob(1L)).thenReturn(offers);

        List<Offer> result = offerService.getOffersByJob(1L);

        assertEquals(1, result.size());
        assertEquals(offer, result.get(0));
        verify(offerRepository).findByJob(1L);
    }

    @Test
    void getOffers_WithFilters_ShouldReturnFilteredOffers() {
        List<Offer> offers = Arrays.asList(offer);
        when(offerRepository.findAll(any(Specification.class))).thenReturn(offers);

        List<Offer> result = offerService.getOffers(LocalDate.now(), 1L, 2L);

        assertEquals(1, result.size());
        assertEquals(offer, result.get(0));
        verify(offerRepository).findAll(any(Specification.class));
    }

    @Test
    void enrollOffer_WhenOfferExists_ShouldEnrollClientAndReturnOffer() {
        when(offerRepository.findById(1L)).thenReturn(Optional.of(offer));
        when(offerRepository.save(any(Offer.class))).thenReturn(offer);

        Offer result = offerService.enrollOffer(1L, client);

        assertNotNull(result);
        assertEquals(client, result.getClient());
        verify(offerRepository).findById(1L);
        verify(offerRepository).save(offer);
    }

    @Test
    void enrollOffer_WhenOfferDoesNotExist_ShouldReturnNull() {

        when(offerRepository.findById(1L)).thenReturn(Optional.empty());

        Offer result = offerService.enrollOffer(1L, client);

        assertNull(result);
        verify(offerRepository).findById(1L);
        verify(offerRepository, never()).save(any(Offer.class));
    }
}