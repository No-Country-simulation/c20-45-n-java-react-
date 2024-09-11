package com.nocountry.pets.repository;

import com.nocountry.pets.models.Prestacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPrestacionRepository extends JpaRepository<Prestacion, Long> {
}
