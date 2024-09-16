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


}
