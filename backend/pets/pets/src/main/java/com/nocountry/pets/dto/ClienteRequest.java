package com.nocountry.pets.dto;


import com.nocountry.pets.models.Cliente;
import com.nocountry.pets.security.models.UserSec;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClienteRequest {
        private Cliente cliente;
        private UserSec userSec;
    }
