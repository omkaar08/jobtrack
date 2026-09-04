package com.jobtrack.config;

import com.jobtrack.entity.ApplicationStatus;
import com.jobtrack.entity.JobApplication;
import com.jobtrack.entity.User;
import com.jobtrack.repository.JobApplicationRepository;
import com.jobtrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final JobApplicationRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DataInitializer(UserRepository userRepository,
                           JobApplicationRepository repository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User demoUser = new User(
                    "Demo User",
                    "demo@jobtrack.com",
                    passwordEncoder.encode("Password@123")
            );

            User savedUser = userRepository.save(demoUser);

            JobApplication app1 = new JobApplication(
                    "TCS",
                    "Java Developer",
                    "Pune",
                    ApplicationStatus.APPLIED,
                    LocalDate.of(2026, 9, 1),
                    null,
                    "https://careers.tcs.com/job/java-dev",
                    "Applied via TCS NextStep Portal. Waiting for initial response.",
                    savedUser
            );

            JobApplication app2 = new JobApplication(
                    "Fujitsu",
                    "Data Engineer",
                    "Bangalore",
                    ApplicationStatus.INTERVIEW,
                    LocalDate.of(2026, 8, 25),
                    LocalDate.of(2026, 9, 10),
                    "https://fujitsu.careers.com/job/data-eng",
                    "Technical round scheduled with lead data engineer. System design and SQL focus.",
                    savedUser
            );

            JobApplication app3 = new JobApplication(
                    "KPIT",
                    "Software Engineer",
                    "Pune",
                    ApplicationStatus.REJECTED,
                    LocalDate.of(2026, 8, 20),
                    null,
                    "https://kpit.com/careers/software-engineer",
                    "Received feedback that candidate with more C++ experience was preferred.",
                    savedUser
            );

            JobApplication app4 = new JobApplication(
                    "Accenture",
                    "Developer",
                    "Mumbai",
                    ApplicationStatus.SELECTED,
                    LocalDate.of(2026, 8, 15),
                    LocalDate.of(2026, 8, 25),
                    "https://accenture.com/jobs/dev",
                    "Received official offer letter! Negotiation on joining date in progress.",
                    savedUser
            );

            JobApplication app5 = new JobApplication(
                    "Infosys",
                    "Full Stack Engineer",
                    "Hyderabad",
                    ApplicationStatus.APPLIED,
                    LocalDate.of(2026, 8, 28),
                    null,
                    "https://infosys.com/careers/fullstack",
                    "Referred by senior software engineer on LinkedIn.",
                    savedUser
            );

            JobApplication app6 = new JobApplication(
                    "Capgemini",
                    "Senior Java Developer",
                    "Noida",
                    ApplicationStatus.INTERVIEW,
                    LocalDate.of(2026, 8, 22),
                    LocalDate.of(2026, 9, 8),
                    "https://capgemini.com/careers/java-lead",
                    "Managerial and technical discussion scheduled for Thursday.",
                    savedUser
            );

            repository.saveAll(Arrays.asList(app1, app2, app3, app4, app5, app6));
            System.out.println("✅ Demo user (demo@jobtrack.com / Password@123) & sample applications initialized successfully!");
        }
    }
}
