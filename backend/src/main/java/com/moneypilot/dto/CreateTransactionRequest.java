package com.moneypilot.dto;

import java.time.LocalDate;

import com.moneypilot.model.TransactionCategory;
import com.moneypilot.model.TransactionType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class CreateTransactionRequest {

    @NotBlank(message = "Description is required")
    private String description;

    @Positive(message = "Amount must be greater than zero")
    private double amount;

    @NotNull(message = "Category is required")
    private TransactionCategory category;

    @NotNull(message = "Type is required")
    private TransactionType type;

    @NotNull(message = "Date is required")
    private LocalDate date;

    public CreateTransactionRequest() {
    }

    public CreateTransactionRequest(String description, double amount, TransactionCategory category, TransactionType type, LocalDate date) {
        this.description = description;
        this.amount = amount;
        this.category = category;
        this.type = type;
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public double getAmount() {
        return amount;
    }

    public TransactionCategory getCategory() {
        return category;
    }

    public TransactionType getType() {
        return type;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setCategory(TransactionCategory category) {
        this.category = category;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
