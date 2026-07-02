package com.moneypilot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.moneypilot.dto.CreateTransactionRequest;
import com.moneypilot.dto.TransactionResponse;
import com.moneypilot.model.Transaction;
import com.moneypilot.repository.TransactionRepository;

@Service
public class TransactionService {
    private final TransactionRepository transactionRep;

    public TransactionService(TransactionRepository rep){
        this.transactionRep = rep;
    }

    public TransactionResponse createTransaction(CreateTransactionRequest request){
        Transaction transaction = new Transaction(
            request.getDescription(),
            request.getAmount(), 
            request.getCategory(),
            request.getType(), 
            request.getDate()
        );

        Transaction savedTransaction = transactionRep.save(transaction);
        return toResponse(savedTransaction);
    }

    public List<TransactionResponse> getAllTransactions() {
        return transactionRep.findAll()
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
