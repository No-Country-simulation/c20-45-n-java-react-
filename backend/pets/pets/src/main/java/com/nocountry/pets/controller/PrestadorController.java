package com.nocountry.pets.controller;


import com.nocountry.pets.dto.PrestadorRequest;
import com.nocountry.pets.models.Cliente;
import com.nocountry.pets.models.Domicilio;
import com.nocountry.pets.models.Prestador;
import com.nocountry.pets.security.models.Role;
import com.nocountry.pets.security.models.UserSec;
import com.nocountry.pets.security.service.IRoleService;
import com.nocountry.pets.security.service.IUserService;
import com.nocountry.pets.service.IClienteService;
import com.nocountry.pets.service.IDomicilioService;
import com.nocountry.pets.service.IPrestadorService;
import com.nocountry.pets.service.PersonaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/prestador")
public class PrestadorController {
    @Autowired
    private IUserService userService;

    @Autowired
    private IPrestadorService prestadorService;
    @Autowired
    private PersonaService<Prestador> personaService;


    @GetMapping
    public List<Prestador> findAll() {
        return prestadorService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Prestador> findById(@PathVariable Long id) {
        return prestadorService.findById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@Valid @RequestBody PrestadorRequest prestadorRequest, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }
        if (prestadorRequest.getPrestador() == null || prestadorRequest.getUserSec() == null) {
            return ResponseEntity.badRequest().body("Prestador ó UserSec no pueden ser nulos");
        }

        Prestador prestador = prestadorRequest.getPrestador();
        UserSec userSec = prestadorRequest.getUserSec();

        prestador = personaService.createPersona(prestador, userSec);

        Prestador savedPrestador = prestadorService.save(prestador);

        userSec.setPersona(savedPrestador);

        userService.save(userSec);

        return ResponseEntity.ok().body("Prestador creado con éxito");
    }

    @PutMapping("/update/{id}")


    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(error -> {
            errors.put(error.getField(), "el campo " + error.getField() + " " + error.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
