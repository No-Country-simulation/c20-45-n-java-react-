package com.nocountry.pets.repository;

import com.nocountry.pets.models.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITurnoRepository extends JpaRepository<Turno, Long> {
    List<Turno> findByClienteId(Long clienteId);
}
