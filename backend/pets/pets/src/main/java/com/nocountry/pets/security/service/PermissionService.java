package com.nocountry.pets.security.service;

import com.nocountry.pets.security.repository.IPermissionRepository;
import com.nocountry.pets.security.models.Permission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PermissionService implements IPermissionService{
    @Autowired
    private IPermissionRepository permissionRepository;

    @Override
    public List<Permission> findAll() {

        return permissionRepository.findAll();
    }
    @Override
    public Optional<Permission> findById(Long id){
        return permissionRepository.findById(id);
    }
    @Override
    public Permission save(Permission permission) {
        return permissionRepository.save(permission);
    }
    @Override
    public void deleteById(Long id) {
        permissionRepository.deleteById(id);
    }
    public Permission update(Permission permission) {
        return permissionRepository.save(permission);
    }
}
