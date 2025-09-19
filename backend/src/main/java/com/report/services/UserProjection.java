package com.report.services;

import org.springframework.data.jpa.repository.Query;

public interface UserProjection {
    Long getId();
    String getName();
    String getEmail();
    String getRole();
}
