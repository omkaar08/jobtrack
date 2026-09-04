package com.jobtrack.repository;

import com.jobtrack.entity.ApplicationStatus;
import com.jobtrack.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    @Query("SELECT j FROM JobApplication j WHERE j.user.id = :userId AND " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(j.companyName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(j.position) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:status IS NULL OR j.status = :status) " +
           "ORDER BY j.appliedDate DESC, j.id DESC")
    List<JobApplication> searchAndFilter(@Param("userId") Long userId,
                                         @Param("search") String search,
                                         @Param("status") ApplicationStatus status);

    Optional<JobApplication> findByIdAndUserId(Long id, Long userId);

    long countByUserId(Long userId);

    long countByUserIdAndStatus(Long userId, ApplicationStatus status);
}
