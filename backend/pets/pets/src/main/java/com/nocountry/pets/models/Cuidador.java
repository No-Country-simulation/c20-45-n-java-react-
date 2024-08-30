package com.nocountry.pets.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
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

public class Cuidador extends Persona{

    private String servicioOfrecido;

    @OneToMany(mappedBy = "cuidador", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Mascota> mascotaList = new ArrayList<>();
}
