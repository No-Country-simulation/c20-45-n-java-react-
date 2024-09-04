package com.nocountry.pets.service;

import com.nocountry.pets.models.Mascota;

import java.util.List;
import java.util.Optional;

public interface IMascotaService {

    List<Mascota> findAll();

    Optional<Mascota> findById(Long id);
    Mascota save(Mascota mascota);
    void deleteById(Long id);

    Mascota update(Mascota mascosta);
}
