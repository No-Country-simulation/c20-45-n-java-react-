package com.nocountry.pets.controller;

import com.nocountry.pets.dto.ClienteRequest;
import com.nocountry.pets.models.Cliente;

import com.nocountry.pets.models.Domicilio;
import com.nocountry.pets.security.models.Role;
import com.nocountry.pets.security.models.UserSec;
import com.nocountry.pets.security.service.IRoleService;
import com.nocountry.pets.security.service.IUserService;
import com.nocountry.pets.service.IClienteService;
import com.nocountry.pets.service.IDomicilioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/cliente")
public class ClienteController {

    @Autowired
    private IClienteService clienteService;

    @Autowired
    private IDomicilioService domicilioService;
    @Autowired
    private IUserService userService;

    @Autowired
    private IRoleService roleService;

    @GetMapping()
    public List<Cliente> findAll(){
        return clienteService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Cliente> findById(@PathVariable Long id){
        return  clienteService.findById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCliente(@Valid @RequestBody ClienteRequest clienteRequest, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }

        if (clienteRequest.getCliente() == null || clienteRequest.getUserSec() == null) {
            return ResponseEntity.badRequest().body("Cliente y UserSec no pueden ser nulos");
        }

        Cliente cliente = clienteRequest.getCliente();
        UserSec userSec = clienteRequest.getUserSec();

        // Guardar Domicilio si existe
        Domicilio domicilio = cliente.getDomicilio();
        if (domicilio != null) {
            Domicilio savedDomicilio = domicilioService.save(domicilio);
            cliente.setDomicilio(savedDomicilio);
        }

        // Encriptar la contraseña
        userSec.setPassword(userService.encriptPassword(userSec.getPassword()));

        // Recuperar y asignar roles
        Set<Role> roleList = new HashSet<>();
        for (Role role : userSec.getRolesList()) {
            Role readRole = roleService.findById(role.getId()).orElse(null);
            if (readRole != null) {
                roleList.add(readRole);
            }
        }

        if (roleList.isEmpty()) {
            return ResponseEntity.badRequest().body("Roles inválidos");
        }

        // Asigna roles al UserSec
        userSec.setRolesList(roleList);

        // Asigna UserSec a Cliente antes de guardar
        cliente.setUserSec(userSec);

        // Guarda Cliente
        Cliente savedCliente = clienteService.save(cliente);

        // Asigna Cliente a UserSec
        userSec.setPersona(savedCliente);

        // Guarda UserSec
        userService.save(userSec);

        return ResponseEntity.ok().body("Cliente creado con éxito");
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateCliente(@PathVariable Long id, @Valid @RequestBody ClienteRequest clienteRequest, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }

        if (clienteRequest.getCliente() == null || clienteRequest.getUserSec() == null) {
            return ResponseEntity.badRequest().body("Cliente y UserSec no pueden ser nulos");
        }

        Cliente existingCliente = clienteService.findById(id).orElse(null);
        if (existingCliente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente no encontrado");
        }

        UserSec existingUserSec = userService.findByPersona(existingCliente).orElse(null);
        if (existingUserSec == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("UserSec asociado no encontrado");
        }
        Cliente cliente = clienteRequest.getCliente();
        UserSec userSec = clienteRequest.getUserSec();

        // Actualiza datos del cliente
        existingCliente.setNombre(cliente.getNombre());
        existingCliente.setApellido(cliente.getApellido());
        existingCliente.setEmail(cliente.getEmail());
        existingCliente.setTelefono(cliente.getTelefono());
        existingCliente.setUserSec(cliente.getUserSec());

        // Actualiza datos del usuario
        if (!userSec.getPassword().equals(existingUserSec.getPassword())) {
            existingUserSec.setUsername(userSec.getUsername());
            existingUserSec.setPassword(userService.encriptPassword(userSec.getPassword()));
        }

        // Actualiza roles existentes
        Set<Role> updatedRoles = new HashSet<>();
        for (Role role : userSec.getRolesList()) {
            Role existingRole = roleService.findById(role.getId()).orElse(null);
            if (existingRole != null) {
                updatedRoles.add(existingRole);
            }
        }
        existingUserSec.setRolesList(updatedRoles);
        existingUserSec.setEnabled(userSec.getEnabled());
        Domicilio existingDomicilio = existingCliente.getDomicilio();
        Domicilio newDomicilio = cliente.getDomicilio();

        if (existingDomicilio != null) {
            existingDomicilio.setCalle(newDomicilio.getCalle());
            existingDomicilio.setNumero(newDomicilio.getNumero());
            existingDomicilio.setLocalidad(newDomicilio.getLocalidad());
            existingDomicilio.setProvincia(newDomicilio.getProvincia());

        }

        clienteService.save(existingCliente);
        userService.save(existingUserSec);

        return ResponseEntity.ok("Cliente y usuario actualizados con éxito");
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        Cliente cliente = clienteService.findById(id).orElse(null);
        if (cliente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente no encontrado");
        }

        // Desactiva el usuario
        UserSec userSec = userService.findByPersona(cliente).orElse(null);
        if (userSec != null) {
            userSec.setEnabled(false);
            userService.save(userSec);
        }

        return ResponseEntity.ok("Cliente desactivado con Exito!!");
    }
    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(error -> {
            errors.put(error.getField(), "el campo " + error.getField() + " " + error.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
