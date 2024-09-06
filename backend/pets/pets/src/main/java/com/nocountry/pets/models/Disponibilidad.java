package com.nocountry.pets.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

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

    private LocalDateTime horaInicio;

    private LocalDateTime horaFin;

    @ManyToOne
    @JoinColumn(name = "prestador_ir", nullable = false)
    private Prestador prestador;
}
