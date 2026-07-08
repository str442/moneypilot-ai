package com.moneypilot.service;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.moneypilot.model.Role;
import com.moneypilot.model.User;
import com.moneypilot.repository.UserRepository;

@Service
public class AuthorizationService {

    private final UserRepository userRepository;

    public AuthorizationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void requireSelfOrAdmin(Long userId) {
        User currentUser = getCurrentUser();

        if (currentUser.getRole() == Role.ADMIN || currentUser.getId().equals(userId)) {
            return;
        }

        throw new AccessDeniedException("You can only access your own MoneyPilot data");
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AccessDeniedException("Authentication is required");
        }

        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new AccessDeniedException("Authenticated user not found"));
    }
}
