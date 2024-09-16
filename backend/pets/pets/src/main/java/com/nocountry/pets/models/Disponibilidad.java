package com.nocountry.pets.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Disponibilidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_disponilidad;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Dia dia;

    private LocalTime horaInicio;


    @ManyToOne
    @JoinColumn(name = "prestador_id", nullable = false)
    @JsonBackReference
    private Prestador prestador;
}
