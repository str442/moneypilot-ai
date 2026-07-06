package com.moneypilot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.moneypilot.dto.CreateUserRequest;
import com.moneypilot.dto.UserResponse;
import com.moneypilot.model.User;
import com.moneypilot.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse createUser(CreateUserRequest request) {
        User user = new User(
                request.getName(),
                request.getEmail()
        );

        User savedUser = userRepository.save(user);

        return toResponse(savedUser);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCreatedAt()
        );
    }
}