package com.sneakpeak.bricool.profession;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfessionService {

    private final ProfessionRepository professionRepository;

    public ProfessionService(ProfessionRepository professionRepository) {
        this.professionRepository = professionRepository;
    }

    public Profession createProfession(Profession profession) {
        return professionRepository.save(profession);
    }

    public List<Profession> getAllProfessions() {
        return professionRepository.findAll();
    }

    public Profession getProfessionById(Long id) {
        Optional<Profession> profession = professionRepository.findById(id);
        return profession.orElse(null);
    }

    public Profession updateProfession(Long id, Profession updatedProfession) {
        Optional<Profession> existingProfessionOpt = professionRepository.findById(id);
        if (existingProfessionOpt.isPresent()) {
            Profession existingProfession = existingProfessionOpt.get();
            existingProfession.setType(updatedProfession.getType());
            return professionRepository.save(existingProfession);
        }
        return null;
    }

    public boolean deleteProfession(Long id) {
        Optional<Profession> professionToDeleteOpt = professionRepository.findById(id);
        if (professionToDeleteOpt.isPresent()) {
            professionRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
