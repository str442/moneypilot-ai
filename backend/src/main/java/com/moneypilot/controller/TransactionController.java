package com.moneypilot.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moneypilot.dto.CreateTransactionRequest;
import com.moneypilot.dto.TransactionResponse;
import com.moneypilot.model.TransactionCategory;
import com.moneypilot.model.TransactionType;
import com.moneypilot.service.TransactionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users/{userId}/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public TransactionResponse createTransaction(
            @PathVariable Long userId,
            @Valid @RequestBody CreateTransactionRequest request
    ) {
        return transactionService.createTransaction(userId, request);
    }

    

    @DeleteMapping("/{transactionId}")
    public void deleteTransaction(
        @PathVariable Long userId,
        @PathVariable Long transactionId
    ) {
        transactionService.deleteTransaction(userId, transactionId);
    }

    @GetMapping
    public List<TransactionResponse> getTransactionsByUser(
        @PathVariable Long userId,
        @RequestParam(required = false) TransactionType type,
        @RequestParam(required = false) TransactionCategory category,
        @RequestParam(required = false) Double minAmount,
        @RequestParam(required = false) LocalDate startDate,
        @RequestParam(required = false) LocalDate endDate,
        @RequestParam(required = false) String sort
    ) {
        return transactionService.getTransactionsByUserId(
                userId,
                type,
                category,
                minAmount,
                startDate,
                endDate,
                sort
        );
    }

    @PutMapping("/{transactionId}")
    public TransactionResponse updateTransaction(
            @PathVariable Long userId,
            @PathVariable Long transactionId,
            @Valid @RequestBody CreateTransactionRequest request
    ) {
        return transactionService.updateTransaction(userId, transactionId, request);
    }
}