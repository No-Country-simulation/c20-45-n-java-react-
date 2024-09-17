package com.nocountry.pets.security.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nocountry.pets.models.Persona;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name= "users")
public class UserSec {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "userSec")
    @JsonIgnore
    private Persona persona;

    private String username;
    private String password;
    private Boolean enabled = true;
    private Boolean accountNotExpired = true;
    private Boolean accountNotLocked = true;
    private Boolean credentialNotExpired = true;
    @ManyToMany(fetch = FetchType.EAGER, cascade= CascadeType.ALL)
    @JoinTable(name= "user_roles", joinColumns = @JoinColumn(name="user_id"))
    private Set<Role> rolesList = new HashSet<>();
}
