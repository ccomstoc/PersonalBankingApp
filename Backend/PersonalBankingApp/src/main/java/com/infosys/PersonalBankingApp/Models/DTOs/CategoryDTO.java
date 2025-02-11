package com.infosys.PersonalBankingApp.Models.DTOs;

public class CategoryDTO {

    private String name;
    private int userId;

    public CategoryDTO(String name, int userId) {
        this.name = name;
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
