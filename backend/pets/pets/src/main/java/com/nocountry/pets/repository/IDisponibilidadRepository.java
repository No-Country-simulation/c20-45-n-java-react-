package com.nocountry.pets.repository;

import com.nocountry.pets.models.Disponibilidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IDisponibilidadRepository extends JpaRepository<Disponibilidad, Long> {

}
