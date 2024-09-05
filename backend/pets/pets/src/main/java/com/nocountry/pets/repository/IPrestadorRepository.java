package com.nocountry.pets.repository;

import com.nocountry.pets.models.Prestador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPrestadorRepository extends JpaRepository<Prestador, Long> {
}
