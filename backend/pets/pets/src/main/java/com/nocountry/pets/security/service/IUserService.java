package com.nocountry.pets.security.service;

import com.nocountry.pets.models.Persona;
import com.nocountry.pets.security.models.UserSec;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<UserSec> findAll();

    Optional<UserSec> findById(Long id);

    UserSec save(UserSec userSec);

    void deleteById(Long id);

    void deactivateUser(Long id);
    UserSec update(UserSec userSec);

    String encriptPassword(String password);
    Optional<UserSec> findByPersona(Persona persona);

}
