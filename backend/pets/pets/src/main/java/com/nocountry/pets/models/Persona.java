package com.nocountry.pets.models;

import com.nocountry.pets.security.models.UserSec;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String nombre;
    @NotNull
    private String apellido;
    @NotNull
    private int dni;
    @NotNull
    @Email
    private String email;
    @NotNull
    private String telefono;

    private String telefonoEmergencia;
    @ManyToOne
    @JoinColumn(name = "domicilio_id", referencedColumnName = "id_domicilio")
    private Domicilio domicilio;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_sec_id", referencedColumnName = "id")
    private UserSec userSec;
}
