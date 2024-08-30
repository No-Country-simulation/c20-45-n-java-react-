package com.nocountry.pets.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Domicilio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDomicilio;
    @NotBlank
    private String calle;
    @NotBlank
    private int altura;
    @NotBlank
    private String localidad;
    @NotBlank
    private String provincia;

    @OneToMany(mappedBy = "domicilio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Persona> personas;
}
