package com.nocountry.pets.dto;

import com.nocountry.pets.models.Prestador;
import com.nocountry.pets.security.models.UserSec;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PrestadorRequest {

    private Prestador prestador;
    private UserSec userSec;
}
