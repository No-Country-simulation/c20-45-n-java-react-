package com.nocountry.pets.service;

import com.nocountry.pets.models.Disponibilidad;
import com.nocountry.pets.repository.IDisponibilidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DisponibilidadService implements IDisponibilidadService{
    @Autowired
    private IDisponibilidadRepository disponibilidadRepository;


    @Override
    public List<Disponibilidad> findAll() {
        return disponibilidadRepository.findAll();
    }

    @Override
    public Optional<Disponibilidad> findById(Long id) {
        return disponibilidadRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        disponibilidadRepository.deleteById(id);
    }

    @Override
    public Disponibilidad save(Disponibilidad disponibilidad) {
        return disponibilidadRepository.save(disponibilidad);
    }


}
