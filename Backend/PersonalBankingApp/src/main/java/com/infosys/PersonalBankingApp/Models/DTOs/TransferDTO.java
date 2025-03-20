package com.infosys.PersonalBankingApp.Models.DTOs;

public class TransferDTO {
    int sendingUserId;
    int receivingUserId;
    double amount;

    public TransferDTO() {
    }

    public TransferDTO(int sendingUserId, int receivingUserId, double amount) {
        this.sendingUserId = sendingUserId;
        this.receivingUserId = receivingUserId;
        this.amount = amount;
    }

    public int getSendingUserId() {
        return sendingUserId;
    }

    public void setSendingUserId(int sendingUserId) {
        this.sendingUserId = sendingUserId;
    }

    public int getReceivingUserId() {
        return receivingUserId;
    }

    public void setReceivingUserId(int receivingUserId) {
        this.receivingUserId = receivingUserId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
