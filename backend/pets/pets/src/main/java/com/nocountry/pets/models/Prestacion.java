package com.nocountry.pets.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    @NotBlank
    private String nombrePrest;
    @NotBlank
    private String descripcionPrest;
    @NotBlank
    private String caracteristicasPrest;
    @NotNull
    private Double precio;

    private int duracion;
    private String zona;
    @ManyToMany(mappedBy = "prestaciones")
    private List<Prestador> prestador = new ArrayList<>();
}
