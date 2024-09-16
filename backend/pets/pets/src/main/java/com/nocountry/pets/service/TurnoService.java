package com.nocountry.pets.service;

import com.nocountry.pets.models.Cliente;
import com.nocountry.pets.models.Prestacion;
import com.nocountry.pets.models.Prestador;
import com.nocountry.pets.models.Turno;
import com.nocountry.pets.repository.IClienteRepository;
import com.nocountry.pets.repository.IPrestacionRepository;
import com.nocountry.pets.repository.IPrestadorRepository;
import com.nocountry.pets.repository.ITurnoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TurnoService implements ITurnoService{

    @Autowired
    private ITurnoRepository turnoRepository;

    @Autowired
    private IClienteRepository clienteRepository;

    @Autowired
    private IPrestadorRepository prestadorRepository;

    @Autowired
    private IPrestacionRepository prestacionRepository;

    @Override
    public List<Turno> findAll() {
        return turnoRepository.findAll();
    }

    @Override
    public Optional<Turno> findById(Long id) {
        return turnoRepository.findById(id);
    }

    @Override
    public Turno save(Turno turno) {
        return turnoRepository.save(turno);
    }

    @Override
    public void deleteById(Long id) {
    turnoRepository.deleteById(id);
    }

    @Override
    public Turno update(Turno turno) {
        return turnoRepository.save(turno);
    }

}
