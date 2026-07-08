package com.moneypilot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.moneypilot.dto.AdminUserResponse;
import com.moneypilot.model.User;
import com.moneypilot.repository.TransactionRepository;
import com.moneypilot.repository.UserRepository;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    public AdminService(UserRepository userRepository, TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
    }

    public List<AdminUserResponse> getUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private AdminUserResponse toResponse(User user) {
        return new AdminUserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedAt(),
                transactionRepository.countByUserId(user.getId())
        );
    }
}
