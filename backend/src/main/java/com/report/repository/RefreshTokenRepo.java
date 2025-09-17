package com.report.repository;

import com.report.entities.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepo extends JpaRepository<RefreshToken,Long> {
    Optional< RefreshToken> findByRefreshToken(String refToken);

}

