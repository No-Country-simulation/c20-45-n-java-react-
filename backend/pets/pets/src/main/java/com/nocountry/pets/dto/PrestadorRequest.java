package com.nocountry.pets.dto;

import com.nocountry.pets.models.Prestacion;
import com.nocountry.pets.security.models.UserSec;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PrestadorRequest {

    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private UserSec userSec;
    private List<Prestacion> prestaciones;

}
