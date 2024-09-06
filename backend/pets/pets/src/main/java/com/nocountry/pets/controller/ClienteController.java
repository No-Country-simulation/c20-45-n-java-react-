package com.nocountry.pets.controller;

import com.nocountry.pets.dto.ClienteRequest;
import com.nocountry.pets.models.Cliente;


import com.nocountry.pets.security.models.UserSec;

import com.nocountry.pets.security.service.UserService;

import com.nocountry.pets.service.IClienteService;

import com.nocountry.pets.service.PersonaService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/cliente")
@CrossOrigin("http://localhost:5173")
public class ClienteController {

    @Autowired
    private IClienteService clienteService;
    @Autowired
    private PersonaService<Cliente> personaService;

    @Autowired
    private UserService userService;

    @GetMapping()
    public List<Cliente> findAll() {
        return clienteService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Cliente> findById(@PathVariable Long id) {
        return clienteService.findById(id);
    }


    @PostMapping("/create")
    public ResponseEntity<?> createCliente(@Valid @RequestBody ClienteRequest clienteRequest, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }
        if (clienteRequest.getUserSec() == null) {
            return ResponseEntity.badRequest().body("UserSec no puede ser nulo");
        }
        Cliente cliente = new Cliente();
        cliente.setNombre(clienteRequest.getNombre());
        cliente.setApellido(clienteRequest.getApellido());
        cliente.setEmail(clienteRequest.getEmail());

        UserSec userSec = clienteRequest.getUserSec();

        cliente = personaService.createPersona(cliente, userSec);

        // Guarda Cliente
        Cliente savedCliente = clienteService.save(cliente);

        // Asigna Cliente a UserSec
        userSec.setPersona(savedCliente);

        // Guarda UserSec
        userService.save(userSec);

        return ResponseEntity.ok().body("Cliente creado con éxito");
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateCliente(@PathVariable Long id, @Valid @RequestBody Cliente cliente, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }

        try {
            Cliente updatedCliente = personaService.updatePersona(id, cliente, cliente.getUserSec());
            return ResponseEntity.ok("Cliente y usuario actualizados con éxito");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error actualizando Cliente");
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        Cliente cliente = clienteService.findById(id).orElse(null);
        if (cliente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente no encontrado");
        }

        // Desactiva el usuario
        UserSec userSec = userService.findByPersona(cliente).orElse(null);
        if (userSec != null) {
            userSec.setEnabled(false);
            userService.save(userSec);
        }

        return ResponseEntity.ok("Cliente desactivado con Exito!!");
    }
    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(error -> {
            errors.put(error.getField(), "el campo " + error.getField() + " " + error.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
