package com.nocountry.pets.service;

import com.nocountry.pets.models.Disponibilidad;

import java.util.List;
import java.util.Optional;

public interface IDisponibilidadService {

    List<Disponibilidad> findAll();

    Optional<Disponibilidad> findById(Long id);

    void deleteById(Long id);

    Disponibilidad save(Disponibilidad disponibilidad);


}
