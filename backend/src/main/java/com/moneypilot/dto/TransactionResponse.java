package com.moneypilot.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.moneypilot.model.TransactionCategory;
import com.moneypilot.model.TransactionType;


public class TransactionResponse {
    private Long id;
    private String description;
    private double amount;
    private TransactionCategory category;
    private TransactionType type;
    private LocalDate date;
    private LocalDateTime createdAt;

    public TransactionResponse(){
        //construtor vazio
    }

    public TransactionResponse(Long id, String description, double amount, TransactionCategory category,
                           TransactionType type, LocalDate date, LocalDateTime createdAt) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.category = category;
        this.type = type;
        this.date = date;
        this.createdAt = createdAt;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    
}
