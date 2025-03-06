package com.sneakpeak.bricool.profession;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessionRepository extends JpaRepository<Profession, Long> {
}
