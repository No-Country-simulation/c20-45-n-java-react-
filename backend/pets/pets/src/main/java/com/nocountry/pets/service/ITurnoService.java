package com.nocountry.pets.service;

import com.nocountry.pets.models.Turno;

import java.util.List;
import java.util.Optional;

public interface ITurnoService {

    List<Turno> findAll();
    Optional<Turno> findById(Long id);
    Turno save(Turno turno);
    void deleteById(Long id);
    Turno update (Turno turno);

}
