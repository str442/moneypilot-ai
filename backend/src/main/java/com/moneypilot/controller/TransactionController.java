package com.moneypilot.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moneypilot.dto.CreateTransactionRequest;
import com.moneypilot.dto.TransactionResponse;
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

    @GetMapping
    public List<TransactionResponse> getTransactionsByUser(
            @PathVariable Long userId
    ) {
        return transactionService.getTransactionsByUserId(userId);
    }

    @DeleteMapping("/{transactionId}")
    public void deleteTransaction(
        @PathVariable Long userId,
        @PathVariable Long transactionId
    ) {
        transactionService.deleteTransaction(userId, transactionId);
    }
}