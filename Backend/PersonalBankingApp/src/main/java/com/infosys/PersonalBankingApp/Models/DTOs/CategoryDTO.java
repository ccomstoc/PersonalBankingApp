package com.infosys.PersonalBankingApp.Models.DTOs;

import com.infosys.PersonalBankingApp.Models.Enums.TransactionType;

public class CategoryDTO {

    private String name;
    private int userId;
    private TransactionType type;

    public CategoryDTO(String name, int userId, TransactionType type) {
        this.name = name;
        this.userId = userId;
        this.type = type;
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }


    public void setName(String name) {
        this.name = name;
    }

    public void setUserID(int userID) {
        this.userId = userID;
    }

    public String getName() {
        return name;
    }

    public int getUserID() {
        return userId;
    }
}
