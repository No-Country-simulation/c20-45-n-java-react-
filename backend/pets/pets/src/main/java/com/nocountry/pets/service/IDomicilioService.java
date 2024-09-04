package com.nocountry.pets.service;

import com.nocountry.pets.models.Domicilio;

import java.util.List;
import java.util.Optional;

public interface IDomicilioService {

    List<Domicilio> findAll();

    Optional<Domicilio> findById(Long id);

    void deleteById(Long id);

    Domicilio update(Domicilio domicilio);

    Domicilio save (Domicilio domicilio);
}
