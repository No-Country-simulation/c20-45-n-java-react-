package com.nocountry.pets.security.service;

import com.nocountry.pets.security.models.Role;

import java.util.List;
import java.util.Optional;

public interface IRoleService {
    List<Role> findAll();

    Optional<Role> findById(Long id);

    Role save(Role role);

    void delete(Long id);

    Role update(Role role);
}
