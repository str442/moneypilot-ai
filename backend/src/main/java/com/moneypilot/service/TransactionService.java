package com.moneypilot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.moneypilot.dto.CreateTransactionRequest;
import com.moneypilot.dto.TransactionResponse;
import com.moneypilot.exception.ResourceNotFoundException;
import com.moneypilot.model.Transaction;
import com.moneypilot.model.User;
import com.moneypilot.repository.TransactionRepository;
import com.moneypilot.repository.UserRepository;

@Service
public class TransactionService {

    private final TransactionRepository transactionRep;
    private final UserRepository userRepository;

    public TransactionService(TransactionRepository transactionRep, UserRepository userRepository) {
        this.transactionRep = transactionRep;
        this.userRepository = userRepository;
    }

    public TransactionResponse createTransaction(Long userId, CreateTransactionRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Transaction transaction = new Transaction(
                request.getDescription(),
                request.getAmount(),
                request.getCategory(),
                request.getType(),
                request.getDate()
        );

        transaction.setUser(user);

        Transaction savedTransaction = transactionRep.save(transaction);

        return toResponse(savedTransaction);
    }

    public List<TransactionResponse> getTransactionsByUserId(Long userId) {
        return transactionRep.findByUserId(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private TransactionResponse toResponse(Transaction transaction) {
        return new TransactionResponse(
                transaction.getId(),
                transaction.getDescription(),
                transaction.getAmount(),
                transaction.getCategory(),
                transaction.getType(),
                transaction.getDate(),
                transaction.getCreatedAt()
        );
    }
}