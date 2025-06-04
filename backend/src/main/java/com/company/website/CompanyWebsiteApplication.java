package com.company.website;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CompanyWebsiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(CompanyWebsiteApplication.class, args);
        System.out.println("✅ Backend is running on http://localhost:8080/");
    }
}
