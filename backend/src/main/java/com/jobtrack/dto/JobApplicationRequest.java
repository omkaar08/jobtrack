package com.jobtrack.dto;

import com.jobtrack.entity.ApplicationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class JobApplicationRequest {

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Job position is required")
    private String position;

    private String location;

    @NotNull(message = "Application status is required")
    private ApplicationStatus status;

    @NotNull(message = "Applied date is required")
    private LocalDate appliedDate;

    private LocalDate interviewDate;

    private String jobUrl;

    private String notes;

    public JobApplicationRequest() {
    }

    public JobApplicationRequest(String companyName, String position, String location,
                                 ApplicationStatus status, LocalDate appliedDate,
                                 LocalDate interviewDate, String jobUrl, String notes) {
        this.companyName = companyName;
        this.position = position;
        this.location = location;
        this.status = status;
        this.appliedDate = appliedDate;
        this.interviewDate = interviewDate;
        this.jobUrl = jobUrl;
        this.notes = notes;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public LocalDate getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDate appliedDate) {
        this.appliedDate = appliedDate;
    }

    public LocalDate getInterviewDate() {
        return interviewDate;
    }

    public void setInterviewDate(LocalDate interviewDate) {
        this.interviewDate = interviewDate;
    }

    public String getJobUrl() {
        return jobUrl;
    }

    public void setJobUrl(String jobUrl) {
        this.jobUrl = jobUrl;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
