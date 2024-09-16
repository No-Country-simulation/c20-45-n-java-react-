package com.nocountry.pets.controller;

import com.nocountry.pets.models.Mascota;
import com.nocountry.pets.service.IMascotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mascota")
@CrossOrigin( "http://localhost:5173/")
public class MascotaController {

    @Autowired
    private IMascotaService mascotaService;

    @GetMapping()
    public List<Mascota> findAll(){
        return mascotaService.findAll();
    }
    @GetMapping("/{id}")
    public Optional<Mascota> findById(@PathVariable Long id){
        return mascotaService.findById(id);
    }
    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody Mascota mascota){
        mascotaService.save(mascota);
        return ResponseEntity.ok("Mascosta creada con exito");
    }


}
