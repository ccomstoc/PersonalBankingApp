package com.infosys.PersonalBankingApp.Models.DTOs;

import com.infosys.PersonalBankingApp.Models.Category;

public class TransactionDTO {
    private int transactionId;
    private Category category;

    public TransactionDTO(int transactionId, Category category) {
        this.transactionId = transactionId;
        this.category = category;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
