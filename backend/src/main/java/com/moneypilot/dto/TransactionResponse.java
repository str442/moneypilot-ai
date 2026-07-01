package com.moneypilot.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.moneypilot.model.TransactionCategory;
import com.moneypilot.model.TransactionType;


public class TransactionResponse {
    private int id;
    private String description;
    private double amount;
    private TransactionCategory category;
    private TransactionType type;
    private LocalDate date;
    private LocalDateTime createdAt;

    public TransactionResponse(){
        //construtor vazio
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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
