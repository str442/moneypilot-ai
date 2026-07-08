package com.moneypilot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moneypilot.model.Transaction;
import com.moneypilot.model.TransactionCategory;
import com.moneypilot.model.TransactionType;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUserId(Long userId);
    Optional<Transaction> findByIdAndUserId(Long transactionId, Long userId);
    List<Transaction> findByUserIdAndType(Long userId, TransactionType type);
    long countByUserId(Long userId);

    List<Transaction> findByUserIdAndCategory(Long userId, TransactionCategory category);

    List<Transaction> findByUserIdAndTypeAndCategory(
        Long userId,
        TransactionType type,
        TransactionCategory category
    );
}
