package com.nocountry.pets.controller;


import com.nocountry.pets.dto.PrestadorRequest;
import com.nocountry.pets.models.Prestacion;
import com.nocountry.pets.models.Prestador;
import com.nocountry.pets.security.models.UserSec;
import com.nocountry.pets.security.service.IUserService;
import com.nocountry.pets.service.IPrestacionService;
import com.nocountry.pets.service.IPrestadorService;
import com.nocountry.pets.service.PersonaService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/prestador")
public class PrestadorController {
    @Autowired
    private IUserService userService;

    @Autowired
    private IPrestacionService prestacionService;
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
        Prestador prestador = new Prestador();
        prestador.setNombre(prestadorRequest.getNombre());
        prestador.setApellido(prestadorRequest.getApellido());
        prestador.setEmail(prestadorRequest.getEmail());
        prestador.setTelefono(prestadorRequest.getTelefono());

        if (prestadorRequest.getPrestaciones() != null && !prestadorRequest.getPrestaciones().isEmpty()) {
            for (Prestacion prestacion : prestadorRequest.getPrestaciones()) {
                // Verificar si la prestación ya existe en la base de datos
                if (prestacion.getId_prestacion() == null || !prestacionService.findById(prestacion.getId_prestacion()).isPresent())  {
                    prestacion = prestacionService.save(prestacion); // Guardar la prestación si no existe
                }
                prestador.getPrestaciones().add(prestacion); // Agregar la prestación al prestador
            }
        }
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
