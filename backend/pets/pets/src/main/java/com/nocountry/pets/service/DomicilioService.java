package com.nocountry.pets.service;

import com.nocountry.pets.models.Domicilio;
import com.nocountry.pets.repository.IDomicilioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DomicilioService implements IDomicilioService{
    @Autowired
    private IDomicilioRepository domicilioRepo;
    @Override
    public List<Domicilio> findAll() {
        return domicilioRepo.findAll();
    }

    @Override
    public Optional<Domicilio> findById(Long id) {
        return domicilioRepo.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        domicilioRepo.deleteById(id);
    }

    @Override
    public Domicilio update(Domicilio domicilio) {
        return domicilioRepo.save(domicilio);
    }

    @Override
    public Domicilio save(Domicilio domicilio) {

        if(domicilioRepo.existsById(domicilio.getIdDomicilio())){
            return domicilioRepo.save(domicilio);
        }else{
            throw new EntityNotFoundException("Domicilio no encontrado con ID: " + domicilio.getIdDomicilio());
        }
    }
}
