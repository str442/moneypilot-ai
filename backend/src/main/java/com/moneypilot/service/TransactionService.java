package com.moneypilot.service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.moneypilot.dto.CreateTransactionRequest;
import com.moneypilot.dto.TransactionResponse;
import com.moneypilot.exception.ResourceNotFoundException;
import com.moneypilot.model.Transaction;
import com.moneypilot.model.TransactionCategory;
import com.moneypilot.model.TransactionType;
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

    public void deleteTransaction(Long userId, Long transactionId) {
        Transaction transaction = transactionRep.findByIdAndUserId(transactionId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));

        transactionRep.delete(transaction);
    }

    public TransactionResponse updateTransaction(
        Long userId,
        Long transactionId,
        CreateTransactionRequest request
    ) {
        Transaction transaction = transactionRep.findByIdAndUserId(transactionId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));

        transaction.setDescription(request.getDescription());
        transaction.setAmount(request.getAmount());
        transaction.setCategory(request.getCategory());
        transaction.setType(request.getType());
        transaction.setDate(request.getDate());

        Transaction updatedTransaction = transactionRep.save(transaction);

        return toResponse(updatedTransaction);
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

    public List<TransactionResponse> getTransactionsByUserId(
        Long userId,
        TransactionType type,
        TransactionCategory category,
        Double minAmount,
        LocalDate startDate,
        LocalDate endDate,
        String sort
    ) {
        userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (minAmount != null && minAmount < 0) {
            throw new IllegalArgumentException("Minimum amount must be greater than or equal to zero");
        }

        if (startDate != null && endDate != null && startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Start date must be before or equal to end date");
        }

        List<Transaction> transactions;

        if (type != null && category != null) {
            transactions = transactionRep.findByUserIdAndTypeAndCategory(userId, type, category);
        } else if (type != null) {
            transactions = transactionRep.findByUserIdAndType(userId, type);
        } else if (category != null) {
            transactions = transactionRep.findByUserIdAndCategory(userId, category);
        } else {
            transactions = transactionRep.findByUserId(userId);
        }

        if (minAmount != null) {
            transactions = transactions.stream()
                .filter(transaction -> transaction.getAmount() >= minAmount)
                .toList();
        }
        if (startDate != null) {
            transactions = transactions.stream()
                    .filter(transaction -> !transaction.getDate().isBefore(startDate))
                    .toList();
        }

        if (endDate != null) {
            transactions = transactions.stream()
                    .filter(transaction -> !transaction.getDate().isAfter(endDate))
                    .toList();
        }

        if (sort != null) {
            switch (sort) {
                case "dateDesc" ->
                        transactions = transactions.stream()
                                .sorted(Comparator.comparing(Transaction::getDate).reversed())
                                .toList();

                case "dateAsc" ->
                        transactions = transactions.stream()
                                .sorted(Comparator.comparing(Transaction::getDate))
                                .toList();

                case "amountDesc" ->
                        transactions = transactions.stream()
                                .sorted(Comparator.comparingDouble(Transaction::getAmount).reversed())
                                .toList();

                case "amountAsc" ->
                        transactions = transactions.stream()
                                .sorted(Comparator.comparingDouble(Transaction::getAmount))
                                .toList();

                default -> throw new IllegalArgumentException(
                        "Invalid sort value. Use dateDesc, dateAsc, amountDesc or amountAsc"
                );
            }
        }

        return transactions.stream()
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