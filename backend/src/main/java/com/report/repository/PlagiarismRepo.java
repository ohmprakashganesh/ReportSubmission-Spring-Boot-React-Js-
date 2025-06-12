package com.report.repository;

import com.report.entities.Plagiarism;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface PlagiarismRepo extends JpaRepository<Plagiarism, Long> {

     Optional<Plagiarism> findByScanId(String id);
}
