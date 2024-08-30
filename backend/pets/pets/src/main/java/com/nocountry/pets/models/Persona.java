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
    private String urlFoto;
    @NotNull
    @Email
    private String email;
    @NotNull
    private String telefono;
    @ManyToOne
    @JoinColumn(name = "domicilio_id", referencedColumnName = "idDomicilio")
    private Domicilio domicilio;
    @OneToOne
    @JoinColumn(name = "userSec_id")
    private UserSec userSec;
}
