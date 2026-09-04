package com.jobtrack.controller;

import com.jobtrack.dto.ApplicationStatsResponse;
import com.jobtrack.dto.JobApplicationRequest;
import com.jobtrack.dto.JobApplicationResponse;
import com.jobtrack.entity.ApplicationStatus;
import com.jobtrack.service.JobApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class JobApplicationController {

    private final JobApplicationService service;

    @Autowired
    public JobApplicationController(JobApplicationService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<JobApplicationResponse>> getAllApplications(
            Authentication authentication,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) ApplicationStatus status) {
        List<JobApplicationResponse> list = service.getAllApplications(authentication.getName(), search, status);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/stats")
    public ResponseEntity<ApplicationStatsResponse> getStats(Authentication authentication) {
        ApplicationStatsResponse stats = service.getStats(authentication.getName());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationResponse> getApplicationById(
            Authentication authentication,
            @PathVariable Long id) {
        JobApplicationResponse response = service.getApplicationById(authentication.getName(), id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<JobApplicationResponse> createApplication(
            Authentication authentication,
            @Valid @RequestBody JobApplicationRequest request) {
        JobApplicationResponse created = service.createApplication(authentication.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobApplicationResponse> updateApplication(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody JobApplicationRequest request) {
        JobApplicationResponse updated = service.updateApplication(authentication.getName(), id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(
            Authentication authentication,
            @PathVariable Long id) {
        service.deleteApplication(authentication.getName(), id);
        return ResponseEntity.noContent().build();
    }
}
