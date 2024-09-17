package com.nocountry.pets.security.service;

import com.nocountry.pets.models.Persona;
import com.nocountry.pets.security.models.UserSec;
import com.nocountry.pets.security.repository.IUserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Override
    public List<UserSec> findAll() {

        return userRepository.findAll();
    }

    @Override
    public Optional<UserSec> findById(Long id) {

        return userRepository.findById(id);
    }

    @Override
    public UserSec save(UserSec userSec) {

        return userRepository.save(userSec);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);

    }

    @Override
    public UserSec update(UserSec userSec) {

        return userRepository.save(userSec);
    }

    @Override
    public String encriptPassword(String password) {

        return new BCryptPasswordEncoder().encode(password);
    }
    @Override
    public void deactivateUser(Long id) {
        UserSec userSec = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        // Cambiar el estado a inactivo
        userSec.setEnabled(false);

        // Guardar los cambios
        userRepository.save(userSec);
    }
    @Override
    public Optional<UserSec> findByPersona(Persona persona) {
        return userRepository.findByPersona(persona);
    }

}
