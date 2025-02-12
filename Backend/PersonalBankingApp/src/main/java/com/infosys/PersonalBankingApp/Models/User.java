package com.infosys.PersonalBankingApp.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)//Include when deserializing, not serializing
    private String password;

    @Column(nullable = false)
    private double balance;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)//mapped by prevents to creation of a join table and specifies what field in other entity to map to
    List<Category> userCategories;

    public User() {
    }

    public User(int userId, String name, String userName, String password, double balance, List<Category> userCategories) {
        this.userId = userId;
        this.name = name;
        this.userName = userName;
        this.password = password;
        this.balance = balance;
        this.userCategories = userCategories;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public List<Category> getUserCategories() {
        return userCategories;
    }

    public void setUserCategories(List<Category> userCategories) {
        this.userCategories = userCategories;
    }


}
