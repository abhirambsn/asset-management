package com.abhirambsn.assetmanager.auth.repository;

import com.abhirambsn.assetmanager.auth.entities.Role;
import com.abhirambsn.assetmanager.auth.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    List<User> findByTenantId(String tenantId);
    Optional<User> findByRole(Role role);
    List<User> findByTenantIdAndRole(String tenantId, Role role);
}
