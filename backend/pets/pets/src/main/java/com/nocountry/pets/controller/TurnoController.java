package com.nocountry.pets.controller;

import com.nocountry.pets.models.Turno;
import com.nocountry.pets.service.ITurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/turnos")
@CrossOrigin( "http://localhost:5173/")
public class TurnoController {
    @Autowired
    private ITurnoService turnoService;

    @GetMapping
    public List<Turno> findAll(){
        return turnoService.findAll();
    }
    @GetMapping("/{id}")
    public Optional<Turno> findById(@PathVariable Long id){
        return turnoService.findById(id);
    }
    @PostMapping("/create")
    public ResponseEntity<?> crearTurno(@RequestBody Turno turno) {
        try {
            Turno savedTurno = turnoService.save(turno);
            return ResponseEntity.ok(savedTurno);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el turno");
        }
    }

    @DeleteMapping
    public ResponseEntity<?> delete(Long id){
        turnoService.deleteById(id);
        return ResponseEntity.ok("Turno cancelado con éxito");
    }
}
