package com.moneypilot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moneypilot.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}