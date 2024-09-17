package com.nocountry.pets.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Date;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Turno {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id_turno;

        @NotNull
        @Temporal(TemporalType.DATE)
        @Future
        private Date fecha;

        @NotNull
        private LocalTime hora;

        @ManyToOne
        @JoinColumn(name = "cliente_id", nullable = false)
        private Cliente cliente;

        @ManyToOne
        @JoinColumn(name = "prestador_id", nullable = false)
        private Prestador prestador;

        @ManyToOne
        @JoinColumn(name = "prestacion_id", nullable = false)
        private Prestacion prestacion;
    }
