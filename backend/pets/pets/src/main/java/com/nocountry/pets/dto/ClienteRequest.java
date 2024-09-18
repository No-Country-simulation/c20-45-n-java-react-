package com.nocountry.pets.dto;


import com.nocountry.pets.models.Domicilio;
import com.nocountry.pets.security.models.UserSec;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClienteRequest {
    private String nombre;
    private String apellido;
    private String email;
    private String dni;
    private String telefono;
    private String telefonoEmergencia;
    private String observaciones;
    private String imagen;
    private UserSec userSec;
    private Domicilio domicilio;
    }
