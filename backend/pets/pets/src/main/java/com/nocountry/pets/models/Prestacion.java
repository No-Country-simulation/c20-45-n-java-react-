package com.nocountry.pets.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Prestacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_prestacion;
    private String nombrePrest;
    private String descripcionPrest;
    private String caracteristicasPrest;
    private Double precio;
    private String zona;

    @ManyToMany(mappedBy = "prestaciones")
    private List<Prestador> prestador = new ArrayList<>();
}
