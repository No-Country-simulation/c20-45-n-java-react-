package com.nocountry.pets.controller;

import com.nocountry.pets.models.Mascota;
import com.nocountry.pets.repository.IMascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mascotas")
public class MascotaController {

    @Autowired
    private IMascotaRepository mascostaRepository;

    @GetMapping()
    public List<Mascota> findAll(){
        return mascostaRepository.findAll();
    }
    @GetMapping("/{id}")
    public Optional<Mascota> findById(@PathVariable Long id){
        return mascostaRepository.findById(id);
    }
    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody Mascota mascota){
        mascostaRepository.save(mascota);
        return ResponseEntity.ok("Mascosta creada con exito");
    }


}
