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
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    public ResponseEntity<?> updatePrestador(@PathVariable Long id, @Valid @RequestBody Prestador prestador, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }

        try {
            Prestador updatePrestador = personaService.updatePersona(id, prestador, prestador.getUserSec());
            return ResponseEntity.ok("Prestador y usuario actualizados con éxito");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error actualizando prestador");
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        Prestador prestador = prestadorService.findById(id).orElse(null);
        if (prestador == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente no encontrado");
        }

        // Desactiva el usuario
        UserSec userSec = userService.findByPersona(prestador).orElse(null);
        if (userSec != null) {
            userSec.setEnabled(false);
            userService.save(userSec);
        }

        return ResponseEntity.ok("Prestador desactivado con éxito!!");
    }


    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(error -> {
            errors.put(error.getField(), "el campo " + error.getField() + " " + error.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
