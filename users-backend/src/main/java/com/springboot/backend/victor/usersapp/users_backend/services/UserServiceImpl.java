package com.springboot.backend.victor.usersapp.users_backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.backend.victor.usersapp.users_backend.entities.Role;
import com.springboot.backend.victor.usersapp.users_backend.entities.User;
import com.springboot.backend.victor.usersapp.users_backend.models.IUser;
import com.springboot.backend.victor.usersapp.users_backend.models.UserRequest;
import com.springboot.backend.victor.usersapp.users_backend.repositories.RoleRepository;
import com.springboot.backend.victor.usersapp.users_backend.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository repository;
    private RoleRepository roleRepository;

    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository repository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return (List) this.repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<User> findAll(Pageable pageable) {
        return this.repository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(@NonNull Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public User save(User user) {

        user.setRoles(getRoles(user));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }


    @Override
    @Transactional
    public Optional<User> update(UserRequest user, Long id) {

        Optional<User> userOptional = repository.findById(id);

        if (userOptional.isPresent()) {
            User userDb = userOptional.orElseThrow();
            userDb.setEmail(user.getEmail());
            userDb.setLastname(user.getLastname());
            userDb.setName(user.getName());
            userDb.setUsername(user.getUsername());

            userDb.setRoles(getRoles(user));

            return Optional.of(repository.save(userDb));
        }

        return Optional.empty();
    }

    @Override
    @Transactional
    public void deleteById(@NonNull Long id) {
        repository.deleteById(id);
    }

    private List<Role> getRoles(IUser user) {
        List<Role> roles = new ArrayList<>();
        Optional<Role> optionaRoleUser = roleRepository.findByName("ROLE_USER");
        optionaRoleUser.ifPresent(roles::add);

        if (user.isAdmin()) {
            Optional<Role> optionaRoleAdmin = roleRepository.findByName("ROLE_ADMIN");
            optionaRoleAdmin.ifPresent(roles::add);
        }
        return roles;
    }

}
