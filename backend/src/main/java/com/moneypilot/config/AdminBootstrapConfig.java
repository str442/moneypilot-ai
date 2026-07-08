package com.moneypilot.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

import com.moneypilot.model.Role;
import com.moneypilot.repository.UserRepository;

@Configuration
public class AdminBootstrapConfig {

    @Bean
    public CommandLineRunner promoteConfiguredAdmin(
            UserRepository userRepository,
            @Value("${moneypilot.admin.email:}") String adminEmail
    ) {
        return args -> {
            if (!StringUtils.hasText(adminEmail)) {
                return;
            }

            userRepository.findByEmail(adminEmail.trim())
                    .filter(user -> user.getRole() != Role.ADMIN)
                    .ifPresent(user -> {
                        user.setRole(Role.ADMIN);
                        userRepository.save(user);
                    });
        };
    }
}
