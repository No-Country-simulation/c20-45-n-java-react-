package com.nocountry.pets.service;

import com.nocountry.pets.models.Prestacion;
import java.util.List;
import java.util.Optional;

public interface IPrestacionService {

    List<Prestacion> findAll();
    Optional<Prestacion> findById(Long id);
    Prestacion save(Prestacion prestacion);
    void deleteById(Long id);
    Prestacion update(Prestacion prestacion);
}
