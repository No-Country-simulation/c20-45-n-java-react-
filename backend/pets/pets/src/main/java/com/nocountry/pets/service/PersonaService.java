package com.nocountry.pets.service;

import com.nocountry.pets.models.Cliente;
import com.nocountry.pets.models.Domicilio;
import com.nocountry.pets.models.Persona;
import com.nocountry.pets.models.Prestador;
import com.nocountry.pets.security.models.Role;
import com.nocountry.pets.security.models.UserSec;
import com.nocountry.pets.security.service.RoleService;
import com.nocountry.pets.security.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class PersonaService <T extends Persona>  {
    @Autowired
    private DomicilioService domicilioService;

    @Autowired
    private ClienteService clienteService;
    @Autowired
    private PrestadorService prestadorService;
    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    public <T extends Persona> T createPersona(T persona, UserSec userSec) {

        Domicilio domicilio = persona.getDomicilio();
        if (domicilio != null) {
            if (domicilio.getId_domicilio() == null) {
                domicilio = domicilioService.save(domicilio);  // Guardar primero
            }
            persona.setDomicilio(domicilio);  // Establecer Domicilio después de guardarlo
        }

        // Encriptar la contraseña
        userSec.setPassword(userService.encriptPassword(userSec.getPassword()));

        // Recuperar y asignar roles
        Set<Role> roleList = new HashSet<>();
        for (Role role : userSec.getRolesList()) {
            Role foundRole = roleService.findById(role.getId()).orElse(null);
            if (foundRole != null) {
                roleList.add(foundRole);
            }
        }

        if (roleList.isEmpty()) {
            throw new IllegalArgumentException("Roles inválidos");
        }

        // Asignar roles al UserSec
        userSec.setRolesList(roleList);

        // Asignar UserSec a la Persona
        persona.setUserSec(userSec);

        return persona;
    }

    // Método genérico para actualizar cualquier entidad que extienda de Persona
    public T updatePersona(Long id, T persona, UserSec userSec) {
        if (persona instanceof Cliente) {
            return (T) updateCliente(id, (Cliente) persona, userSec);
        } else if (persona instanceof Prestador) {
            return (T) updatePrestador(id, (Prestador) persona, userSec);
        }
        throw new IllegalArgumentException("Tipo de persona no soportado");
    }

    // Método para actualizar un Cliente
    private Cliente updateCliente(Long id, Cliente cliente, UserSec userSec) {
        Cliente existingCliente = clienteService.findById(id).orElseThrow(() -> new EntityNotFoundException("Cliente no encontrado"));
        UserSec existingUserSec = userService.findByPersona(existingCliente).orElseThrow(() -> new EntityNotFoundException("UserSec no encontrado"));

        // Actualizar datos del cliente
        existingCliente.setNombre(cliente.getNombre());
        existingCliente.setApellido(cliente.getApellido());
        existingCliente.setEmail(cliente.getEmail());
        existingCliente.setTelefono(cliente.getTelefono());

        // Actualizar domicilio
        Domicilio newDomicilio = cliente.getDomicilio();
        if (newDomicilio != null) {
            Domicilio existingDomicilio = existingCliente.getDomicilio();
            if (existingDomicilio != null) {
                existingDomicilio.setCalle(newDomicilio.getCalle());
                existingDomicilio.setNumero(newDomicilio.getNumero());
                existingDomicilio.setLocalidad(newDomicilio.getLocalidad());
                existingDomicilio.setProvincia(newDomicilio.getProvincia());
            } else {
                existingCliente.setDomicilio(domicilioService.save(newDomicilio));
            }
        }

        // Actualizar UserSec
        updateUserSec(existingUserSec, userSec);

        // Guardar Cliente y UserSec
        clienteService.save(existingCliente);
        userService.save(existingUserSec);

        return existingCliente;
    }

    // Método para actualizar un Prestador
    private Prestador updatePrestador(Long id, Prestador prestador, UserSec userSec) {
        Prestador existingPrestador = prestadorService.findById(id).orElseThrow(() -> new EntityNotFoundException("Prestador no encontrado"));
        UserSec existingUserSec = userService.findByPersona(existingPrestador).orElseThrow(() -> new EntityNotFoundException("UserSec no encontrado"));

        // Actualizar datos del prestador
        existingPrestador.setNombre(prestador.getNombre());
        existingPrestador.setApellido(prestador.getApellido());
        existingPrestador.setEmail(prestador.getEmail());
        existingPrestador.setTelefono(prestador.getTelefono());
        existingPrestador.setPrestacionOfrecida(prestador.getPrestacionOfrecida());
        existingPrestador.setUrlFoto(prestador.getUrlFoto());

        // Actualizar UserSec
        updateUserSec(existingUserSec, userSec);

        // Guardar Prestador y UserSec
        prestadorService.save(existingPrestador);
        userService.save(existingUserSec);

        return existingPrestador;
    }

    // Método para actualizar UserSec
    private void updateUserSec(UserSec existingUserSec, UserSec userSec) {
        existingUserSec.setUsername(userSec.getUsername());
        if (!userSec.getPassword().equals(existingUserSec.getPassword())) {
            existingUserSec.setPassword(userService.encriptPassword(userSec.getPassword()));
        }

        // Actualizar roles
        Set<Role> updatedRoles = new HashSet<>();
        for (Role role : userSec.getRolesList()) {
            Role existingRole = roleService.findById(role.getId()).orElse(null);
            if (existingRole != null) {
                updatedRoles.add(existingRole);
            }
        }
        existingUserSec.setRolesList(updatedRoles);
        existingUserSec.setEnabled(userSec.getEnabled());
    }
}

