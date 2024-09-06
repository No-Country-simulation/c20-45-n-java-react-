package com.nocountry.pets.service;

import com.nocountry.pets.models.Prestador;

import java.util.List;
import java.util.Optional;

public interface IPrestadorService {

    List<Prestador> findAll();

    Optional<Prestador> findById(Long id);

    Prestador save(Prestador prestador);

    void deleteById(Long id);

    Prestador update(Prestador prestador);
}
