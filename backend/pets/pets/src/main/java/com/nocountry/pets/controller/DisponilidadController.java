package com.nocountry.pets.controller;

import com.nocountry.pets.models.Disponibilidad;
import com.nocountry.pets.models.Prestador;
import com.nocountry.pets.service.IDisponibilidadService;
import com.nocountry.pets.service.IPrestadorService;
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

    @Autowired
    private IPrestadorService prestadorService;
    @GetMapping
    public List<Disponibilidad> findAll(){
        return disponibilidadService.findAll();
    }
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Disponibilidad disponibilidadRequest) {
        // Obtener el prestador por ID
        Optional<Prestador> optionalPrestador = prestadorService.findById(disponibilidadRequest.getPrestador().getId());

        if (!optionalPrestador.isPresent()) {
            return ResponseEntity.badRequest().body("Prestador no encontrado");
        }

        Prestador prestador = optionalPrestador.get();

        // Crear la disponibilidad
        Disponibilidad disponibilidad = new Disponibilidad();
        disponibilidad.setDia(disponibilidadRequest.getDia());
        disponibilidad.setHoraInicio(disponibilidadRequest.getHoraInicio());
        disponibilidad.setHoraFin(disponibilidadRequest.getHoraFin());

        // Asignar el prestador a la disponibilidad
        disponibilidad.setPrestador(prestador);

        // Guardar la disponibilidad
        disponibilidadService.save(disponibilidad);

        return ResponseEntity.ok("Disponibilidad creada con éxito");
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
