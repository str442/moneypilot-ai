package com.moneypilot.service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.moneypilot.dto.DashboardResponse;
import com.moneypilot.dto.TransactionResponse;
import com.moneypilot.exception.ResourceNotFoundException;
import com.moneypilot.model.Transaction;
import com.moneypilot.model.TransactionCategory;
import com.moneypilot.model.TransactionType;
import com.moneypilot.repository.TransactionRepository;
import com.moneypilot.repository.UserRepository;
@Service
public class DashboardService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public DashboardService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    public DashboardResponse getDashboardByUserId(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Transaction> transactions = transactionRepository.findByUserId(userId);

        List<Transaction> expenses = transactions.stream()
                .filter(transaction -> transaction.getType() == TransactionType.EXPENSE)
                .toList();

        List<Transaction> incomes = transactions.stream()
                .filter(transaction -> transaction.getType() == TransactionType.INCOME)
                .toList();

        double totalExpenses = expenses.stream()
                .mapToDouble(Transaction::getAmount)
                .sum();

        double totalIncome = incomes.stream()
                .mapToDouble(Transaction::getAmount)
                .sum();

        int expenseCount = expenses.size();
        int incomeCount = incomes.size();

        double averageExpense = expenseCount == 0 ? 0 : totalExpenses / expenseCount;
        double balance = totalIncome - totalExpenses;

        TransactionResponse highestExpense = expenses.stream()
                .max(Comparator.comparingDouble(Transaction::getAmount))
                .map(this::toTransactionResponse)
                .orElse(null);

        Map<TransactionCategory, Double> expensesByCategory = expenses.stream()
                .collect(Collectors.groupingBy(
                        Transaction::getCategory,
                        Collectors.summingDouble(Transaction::getAmount)
                ));

        return new DashboardResponse(
                totalIncome,
                totalExpenses,
                balance,
                expenseCount,
                incomeCount,
                averageExpense,
                highestExpense,
                expensesByCategory
        );
    }

    private TransactionResponse toTransactionResponse(Transaction transaction) {
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