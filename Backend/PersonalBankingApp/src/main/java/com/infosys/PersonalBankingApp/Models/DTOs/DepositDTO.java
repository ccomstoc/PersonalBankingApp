package com.infosys.PersonalBankingApp.Models.DTOs;

public class DepositDTO {
    private int userId;
    private double amount;

    public DepositDTO(int userId, int amount) {
        this.userId = userId;
        this.amount = amount;
    }

    public int getUserId() {
        return userId;
    }

    public double getAmount() {
        return amount;
    }
}
