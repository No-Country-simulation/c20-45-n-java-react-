package com.nocountry.pets.security.repository;

import com.nocountry.pets.models.Persona;
import com.nocountry.pets.security.models.UserSec;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository <UserSec, Long> {
    Optional<UserSec> findUserByUsername(String username);
    Optional<UserSec> findByPersona(Persona persona);
}
