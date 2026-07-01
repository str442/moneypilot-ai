package com.moneypilot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moneypilot.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
