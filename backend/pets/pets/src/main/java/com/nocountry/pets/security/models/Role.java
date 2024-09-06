package com.nocountry.pets.security.models;


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
@Table(name="roles")
public class Role {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String role = "USER";

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name= "roles_permissions", joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns=@JoinColumn(name = "permission_id"))
    private Set<Permission> permissionList = new HashSet<>();


}
