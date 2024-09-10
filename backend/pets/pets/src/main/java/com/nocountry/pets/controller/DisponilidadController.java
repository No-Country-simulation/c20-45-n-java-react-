package com.nocountry.pets.controller;

import com.nocountry.pets.models.Disponibilidad;
import com.nocountry.pets.service.IDisponibilidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/disponilidad")
public class DisponilidadController {

    @Autowired
    private IDisponibilidadService disponibilidadService;

    @GetMapping
    public List<Disponibilidad> findAll(){
        return disponibilidadService.findAll();
    }
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Disponibilidad disponibilidad){
        return ResponseEntity.ok().body("Disponibilidad creada con exito");
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Disponibilidad disponibilidad){
        try{
            Optional<Disponibilidad> optDisponibilidad = disponibilidadService.findById(id);
            if (optDisponibilidad.isPresent()){
                Disponibilidad disponibilidadExistente =optDisponibilidad.get();

                disponibilidadExistente.setDia(disponibilidad.getDia());
                disponibilidadExistente.setHoraInicio(disponibilidad.getHoraInicio());
                disponibilidadExistente.setHoraFin(disponibilidad.getHoraFin());

                Disponibilidad disponibilidadUpdate = disponibilidadService.save(disponibilidadExistente);
                return ResponseEntity.ok(disponibilidadUpdate);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Disponibilidad no encontrada");
            }
        }catch  (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar la disponibilidad: " + e.getMessage());
        }

    }
}
