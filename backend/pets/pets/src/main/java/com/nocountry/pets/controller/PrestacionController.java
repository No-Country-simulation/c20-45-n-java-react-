package com.nocountry.pets.controller;

import com.nocountry.pets.models.Prestacion;
import com.nocountry.pets.service.IPrestacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/prestacion")
@CrossOrigin( "http://localhost:5173/")
public class PrestacionController {
    @Autowired
    private IPrestacionService prestacionService;

    @GetMapping
    public List<Prestacion> findAll(){
        return prestacionService.findAll();
    }
    @GetMapping("/{id}")
    public Optional<Prestacion> findById(@PathVariable Long id){
        return prestacionService.findById(id);
    }
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Prestacion prestacion){
        prestacionService.save(prestacion);
        return ResponseEntity.ok("Prestacion creada con éxito");
    }
    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(Long id){
        Prestacion prestacion = prestacionService.findById(id).orElse(null);
        if (prestacion == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Prestación no encontrada");
        }
        prestacionService.deleteById(id);
        return ResponseEntity.ok().body("Prestación eliminada con éxito");
    }
}
