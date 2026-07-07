package com.moneypilot.dto;

import java.util.Map;

import com.moneypilot.model.TransactionCategory;

public class DashboardResponse {

    private double totalIncome;
    private double totalExpenses;
    private double balance;
    private int expenseCount;
    private int incomeCount;
    private double averageExpense;
    private TransactionResponse highestExpense;
    private Map<TransactionCategory, Double> expensesByCategory;

    public DashboardResponse() {
    }

    public DashboardResponse(
            double totalIncome,
            double totalExpenses,
            double balance,
            int expenseCount,
            int incomeCount,
            double averageExpense,
            TransactionResponse highestExpense,
            Map<TransactionCategory, Double> expensesByCategory
    ) {
        this.totalIncome = totalIncome;
        this.totalExpenses = totalExpenses;
        this.balance = balance;
        this.expenseCount = expenseCount;
        this.incomeCount = incomeCount;
        this.averageExpense = averageExpense;
        this.highestExpense = highestExpense;
        this.expensesByCategory = expensesByCategory;
    }

    public double getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(double totalIncome) {
        this.totalIncome = totalIncome;
    }

    public double getTotalExpenses() {
        return totalExpenses;
    }

    public void setTotalExpenses(double totalExpenses) {
        this.totalExpenses = totalExpenses;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public int getExpenseCount() {
        return expenseCount;
    }

    public void setExpenseCount(int expenseCount) {
        this.expenseCount = expenseCount;
    }

    public int getIncomeCount() {
        return incomeCount;
    }

    public void setIncomeCount(int incomeCount) {
        this.incomeCount = incomeCount;
    }

    public double getAverageExpense() {
        return averageExpense;
    }

    public void setAverageExpense(double averageExpense) {
        this.averageExpense = averageExpense;
    }

    public TransactionResponse getHighestExpense() {
        return highestExpense;
    }

    public void setHighestExpense(TransactionResponse highestExpense) {
        this.highestExpense = highestExpense;
    }

    public Map<TransactionCategory, Double> getExpensesByCategory() {
        return expensesByCategory;
    }

    public void setExpensesByCategory(Map<TransactionCategory, Double> expensesByCategory) {
        this.expensesByCategory = expensesByCategory;
    }
}