package com.nocountry.pets.service;

import com.nocountry.pets.models.Cliente;

import java.util.List;
import java.util.Optional;

public interface IClienteService {

    List<Cliente> findAll();

    Optional <Cliente> findById(Long id);

    Cliente save(Cliente cliente);
    void deleteById(Long id);

    Cliente update(Cliente cliente);
}
