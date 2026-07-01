package com.moneypilot.model;


import java.time.LocalDate;
import java.time.LocalDateTime;

public class Transaction {

    private Long id;
    private String description;
    private double amount;
    private TransactionCategory category;
    private TransactionType type;
    private LocalDate date;
    private LocalDateTime createdAt;

    public Transaction() {
        // construtor vazio
    }

    public Transaction(String description, double amount, TransactionCategory category, TransactionType type, LocalDate date) {
        this.description = description;
        this.amount = amount;
        this.category = category;
        this.type = type;
        this.date = date;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public TransactionCategory getCategory() {
        return category;
    }

    public void setCategory(TransactionCategory category) {
        this.category = category;
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDateTime getDateCriation() {
        return createdAt;
    }

    public void setDateCriation(LocalDateTime dateCriation) {
        this.createdAt = dateCriation;
    }

    
}