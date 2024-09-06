package com.nocountry.pets.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Mascota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_mascota;
    @NotNull
    private String especie;
    @NotNull
    private String raza;
    @NotNull
    private String nombre;

    private String genero;
    @NotNull
    private String condicionMedica;
    private String comportamiento;
    private String dieta;
    private String imagen;
    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    @JsonBackReference
    private Cliente cliente;

    @ManyToMany(mappedBy = "mascotaList")
    private List<Prestador> prestador = new ArrayList<>();
}
