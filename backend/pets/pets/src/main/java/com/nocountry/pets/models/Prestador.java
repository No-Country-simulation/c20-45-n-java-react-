package com.nocountry.pets.models;

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

public class Prestador extends Persona{

    private String prestacionOfrecida;

    private String urlFoto;

    private String calificacion;

    @ManyToMany
    @JoinTable(
            name = "prestador_prestacion",
            joinColumns = @JoinColumn(name = "prestador_id"),
            inverseJoinColumns = @JoinColumn(name = "prestacion_id")
    )
    private List<Prestacion> prestaciones = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "prestador_mascota",
            joinColumns = @JoinColumn(name = "prestador_id"),
            inverseJoinColumns = @JoinColumn(name = "mascota_id")
    )
    private List<Mascota> mascotaList = new ArrayList<>();

    @OneToMany(mappedBy = "prestador", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Disponibilidad> disponibilidades = new ArrayList<>();

}
