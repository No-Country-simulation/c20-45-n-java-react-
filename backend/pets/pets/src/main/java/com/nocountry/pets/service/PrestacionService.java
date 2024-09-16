package com.nocountry.pets.service;

import com.nocountry.pets.models.Prestacion;
import com.nocountry.pets.repository.IPrestacionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrestacionService implements IPrestacionService{
    @Autowired
    private IPrestacionRepository prestacionRepository;
    @Override
    public List<Prestacion> findAll() {
        return prestacionRepository.findAll();
    }

    @Override
    public Optional<Prestacion> findById(Long id) {
        return prestacionRepository.findById(id);
    }

    @Override
    public Prestacion save(Prestacion prestacion) {
        return prestacionRepository.save(prestacion);
    }

    @Override
    public void deleteById(Long id) {
    prestacionRepository.deleteById(id);
    }

    @Override
    public Prestacion update(Prestacion prestacion) {
        if (prestacion.getId_prestacion() != null && prestacionRepository.existsById(prestacion.getId_prestacion())){
            return prestacionRepository.save(prestacion);
        }else {
            throw new EntityNotFoundException("Prestación con ID " + prestacion.getId_prestacion() + " no existe.");
        }
    }


}
