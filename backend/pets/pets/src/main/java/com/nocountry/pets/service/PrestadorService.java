package com.nocountry.pets.service;

import com.nocountry.pets.models.Prestador;
import com.nocountry.pets.repository.IPrestadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrestadorService implements IPrestadorService {

    @Autowired
    private IPrestadorRepository prestadorRepository;
    @Override
    public List<Prestador> findAll() {
        return prestadorRepository.findAll();
    }

    @Override
    public Optional<Prestador> findById(Long id) {
        return prestadorRepository.findById(id);
    }

    @Override
    public Prestador save(Prestador prestador) {
        return prestadorRepository.save(prestador);
    }

    @Override
    public void deleteById(Long id) {
        prestadorRepository.deleteById(id);
    }

    @Override
    public Prestador update(Prestador prestador) {
        return prestadorRepository.save(prestador);
    }
}
