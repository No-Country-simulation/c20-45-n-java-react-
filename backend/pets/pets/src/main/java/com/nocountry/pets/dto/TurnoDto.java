package com.nocountry.pets.dto;

import jakarta.persistence.Entity;
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
public class TurnoDto {

    private Long idTurno;

    @NotNull
    @Future
    private Date fecha;

    @NotNull
    private LocalTime hora;

    @NotNull
    private Long clienteId;

    @NotNull
    private Long cuidadorId;

    @NotNull
    private Long prestacionId;

}
