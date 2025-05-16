package com.infosys.PersonalBankingApp.Models.DTOs;

import com.infosys.PersonalBankingApp.Models.Transaction;

import java.util.List;

public class CategoryStatisticsDTO {
    private int countTransaction;
    private double sumAmount;
    private List<Transaction> transactions;

    public CategoryStatisticsDTO() {
    }

    public CategoryStatisticsDTO(int countTransaction, double sumAmount) {
        this.countTransaction = countTransaction;
        this.sumAmount = sumAmount;
    }

    public CategoryStatisticsDTO(int countTransaction, double sumAmount, List<Transaction> transactions) {
        this.countTransaction = countTransaction;
        this.sumAmount = sumAmount;
        this.transactions = transactions;
    }

    public void setCountTransaction(int countTransaction) {
        this.countTransaction = countTransaction;
    }

    public void setSumAmount(double sumAmount) {
        this.sumAmount = sumAmount;
    }

    public int getCountTransaction() {
        return countTransaction;
    }

    public double getSumAmount() {
        return sumAmount;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }
}
