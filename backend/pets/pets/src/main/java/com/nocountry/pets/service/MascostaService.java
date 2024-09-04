package com.nocountry.pets.service;

import com.nocountry.pets.models.Mascota;
import com.nocountry.pets.repository.IMascotaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MascostaService implements IMascotaService{
    @Autowired
    private IMascotaRepository mascostaRepo;
    @Override
    public List<Mascota> findAll() {
        return mascostaRepo.findAll();
    }

    @Override
    public Optional<Mascota> findById(Long id) {
        return mascostaRepo.findById(id);
    }

    @Override
    public Mascota save(Mascota mascota) {
        return mascostaRepo.save(mascota);
    }

    @Override
    public void deleteById(Long id) {
        mascostaRepo.deleteById(id);
    }

    @Override
    public Mascota update(Mascota mascosta) {
        if (mascostaRepo.existsById(mascosta.getId_mascota())){
            return mascostaRepo.save(mascosta);
        }else {
            throw new EntityNotFoundException("Mascosta no encontrado con ID: " + mascosta.getId_mascota());
        }
    }
}
