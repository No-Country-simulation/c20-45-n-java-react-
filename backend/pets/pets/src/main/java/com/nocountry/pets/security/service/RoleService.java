package com.nocountry.pets.security.service;

import com.nocountry.pets.security.models.Role;
import com.nocountry.pets.security.repository.IRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService implements IRoleService {

    @Autowired
    private IRoleRepository roleRepository;

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public Optional<Role> findById(Long id) {
        return roleRepository.findById(id);
    }
    public Optional<Role> findByRole(String role) {
        return roleRepository.findByRole(role);
    }
    @Override
    public Role save(Role role) {

        return roleRepository.save(role);
    }

    @Override
    public void delete(Long id) {
        roleRepository.deleteById(id);
    }

    @Override
    public Role update(Role role) {

        return roleRepository.save(role);
    }
}
