package com.nocountry.pets.models;

import com.nocountry.pets.security.models.UserSec;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
    @Email
    private String email;
    private String dni;
    private String telefono;
    private String telefonoEmergencia;
    @Size(max = 750)
    private String imagen;
    @Size(max=1500)
    private String observaciones;
    @ManyToOne
    @JoinColumn(name = "domicilio_id", referencedColumnName = "id_domicilio")
    private Domicilio domicilio;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_sec_id", referencedColumnName = "id")
    private UserSec userSec;
}
