package com.sneakpeak.bricool.profession;


import com.sneakpeak.bricool.utils.EntityDtoMapper;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/professions")
public class ProfessionController {

    private final ProfessionService professionService;
    private final ModelMapper modelMapper;

    public ProfessionController(ProfessionService professionService, ModelMapper modelMapper) {
        this.professionService = professionService;
        this.modelMapper = modelMapper;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Profession> createProfession(@RequestBody Profession profession) {
        Profession createdProfession = professionService.createProfession(profession);
        return ResponseEntity.status(201).body(createdProfession);
    }

    @GetMapping
    public ResponseEntity<List<ProfessionReturnDTO>> getAllProfessions() {
        List<Profession> professions = professionService.getAllProfessions();
        List<ProfessionReturnDTO> dtoList = professions.stream()
                .map(profession -> modelMapper.map(profession, ProfessionReturnDTO.class))
                .toList();
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getProfessionById(@PathVariable Long id) {
        Profession profession = professionService.getProfessionById(id);
        if (profession == null) {
            return ResponseEntity.status(404).body("Profession not found");
        }
        return ResponseEntity.ok(profession);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateProfession(@PathVariable Long id, @RequestBody Profession profession) {
        Profession updatedProfession = professionService.updateProfession(id, profession);
        if (updatedProfession == null) {
            return ResponseEntity.status(404).body("Profession not found");
        }
        return ResponseEntity.ok(updatedProfession);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteProfession(@PathVariable Long id) {
        boolean isDeleted = professionService.deleteProfession(id);
        if (!isDeleted) {
            return ResponseEntity.status(404).body("Profession not found");
        }
        return ResponseEntity.status(204).build();
    }
}
