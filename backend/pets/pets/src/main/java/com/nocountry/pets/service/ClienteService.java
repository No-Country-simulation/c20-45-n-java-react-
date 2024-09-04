package com.nocountry.pets.service;

import com.nocountry.pets.models.Cliente;
import com.nocountry.pets.repository.IClienteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService implements IClienteService{
    @Autowired
    private IClienteRepository clienteRepo;
    @Override
    public List<Cliente> findAll() {
        return clienteRepo.findAll();
    }

    @Override
    public Optional<Cliente> findById(Long id) {
        return clienteRepo.findById(id);
    }

    @Override
    public Cliente save(Cliente cliente) {
        return clienteRepo.save(cliente);
    }

    @Override
    public void deleteById(Long id) {
        clienteRepo.deleteById(id);
    }

    @Override
    public Cliente update(Cliente cliente) {
        if (clienteRepo.existsById(cliente.getId())) {
            return clienteRepo.save(cliente);
        } else {
            throw new EntityNotFoundException("Cliente no encontrado con ID: " + cliente.getId());
        }
    }
}
