package com.nocountry.pets.repository;

import com.nocountry.pets.models.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IMascotaRepository extends JpaRepository<Mascota, Long> {
}
