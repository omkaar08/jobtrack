package com.jobtrack.service;

import com.jobtrack.dto.ApplicationStatsResponse;
import com.jobtrack.dto.JobApplicationRequest;
import com.jobtrack.dto.JobApplicationResponse;
import com.jobtrack.entity.ApplicationStatus;
import com.jobtrack.entity.JobApplication;
import com.jobtrack.entity.User;
import com.jobtrack.exception.ResourceNotFoundException;
import com.jobtrack.repository.JobApplicationRepository;
import com.jobtrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobApplicationService {

    private final JobApplicationRepository repository;
    private final UserRepository userRepository;

    @Autowired
    public JobApplicationService(JobApplicationRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    private User getUserByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail.toLowerCase().trim())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
    }

    @Transactional(readOnly = true)
    public List<JobApplicationResponse> getAllApplications(String userEmail, String search, ApplicationStatus status) {
        User user = getUserByEmail(userEmail);
        List<JobApplication> applications = repository.searchAndFilter(user.getId(), search, status);
        return applications.stream()
                .map(JobApplicationResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public JobApplicationResponse getApplicationById(String userEmail, Long id) {
        User user = getUserByEmail(userEmail);
        JobApplication application = repository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found with ID: " + id));
        return new JobApplicationResponse(application);
    }

    @Transactional
    public JobApplicationResponse createApplication(String userEmail, JobApplicationRequest request) {
        User user = getUserByEmail(userEmail);
        JobApplication application = new JobApplication(
                request.getCompanyName(),
                request.getPosition(),
                request.getLocation(),
                request.getStatus(),
                request.getAppliedDate(),
                request.getInterviewDate(),
                request.getJobUrl(),
                request.getNotes(),
                user
        );
        JobApplication saved = repository.save(application);
        return new JobApplicationResponse(saved);
    }

    @Transactional
    public JobApplicationResponse updateApplication(String userEmail, Long id, JobApplicationRequest request) {
        User user = getUserByEmail(userEmail);
        JobApplication application = repository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found with ID: " + id));

        application.setCompanyName(request.getCompanyName());
        application.setPosition(request.getPosition());
        application.setLocation(request.getLocation());
        application.setStatus(request.getStatus());
        application.setAppliedDate(request.getAppliedDate());
        application.setInterviewDate(request.getInterviewDate());
        application.setJobUrl(request.getJobUrl());
        application.setNotes(request.getNotes());

        JobApplication updated = repository.save(application);
        return new JobApplicationResponse(updated);
    }

    @Transactional
    public void deleteApplication(String userEmail, Long id) {
        User user = getUserByEmail(userEmail);
        JobApplication application = repository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found with ID: " + id));
        repository.delete(application);
    }

    @Transactional(readOnly = true)
    public ApplicationStatsResponse getStats(String userEmail) {
        User user = getUserByEmail(userEmail);
        Long userId = user.getId();

        long total = repository.countByUserId(userId);
        long applied = repository.countByUserIdAndStatus(userId, ApplicationStatus.APPLIED);
        long interviews = repository.countByUserIdAndStatus(userId, ApplicationStatus.INTERVIEW);
        long rejected = repository.countByUserIdAndStatus(userId, ApplicationStatus.REJECTED);
        long selected = repository.countByUserIdAndStatus(userId, ApplicationStatus.SELECTED);

        return new ApplicationStatsResponse(total, applied, interviews, rejected, selected);
    }
}
