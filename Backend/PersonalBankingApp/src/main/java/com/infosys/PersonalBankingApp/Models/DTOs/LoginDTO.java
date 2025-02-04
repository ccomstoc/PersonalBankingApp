package com.infosys.PersonalBankingApp.Models.DTOs;

import org.springframework.stereotype.Component;


public class LoginDTO {
    private String userName;

    private String password;

    public LoginDTO(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }
}
