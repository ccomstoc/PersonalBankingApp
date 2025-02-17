package com.infosys.PersonalBankingApp.Models.DTOs;

public class CategoryStatisticsDTO {
    private int countTransaction;
    private double sumAmount;

    public CategoryStatisticsDTO() {
    }

    public CategoryStatisticsDTO(int countTransaction, double sumAmount) {
        this.countTransaction = countTransaction;
        this.sumAmount = sumAmount;
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
}
