package com.nocountry.pets.security.repository;

import com.nocountry.pets.security.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface IRoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRole(String role);

}
