package com.company.website.repository;

import com.company.website.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.Date;

public interface UserRepository extends JpaRepository<User, Long> {
    // Basic user lookup methods
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    // Existence checks
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    // Verification token methods
    Optional<User> findByVerificationToken(String token);

    // Cleanup method for expired tokens (optional)
    void deleteByVerificationTokenExpiryBefore(Date now);
}