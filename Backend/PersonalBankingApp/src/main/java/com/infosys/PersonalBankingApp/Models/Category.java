package com.infosys.PersonalBankingApp.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.infosys.PersonalBankingApp.Models.Enums.TransactionType;
import jakarta.persistence.*;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int categoryId;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JsonIgnore
    private User user;

    @Enumerated(EnumType.STRING)
    private TransactionType type;


    public Category() {
    }

    public Category(int categoryId, String name, User user, TransactionType type) {
        this.categoryId = categoryId;
        this.name = name;
        this.user = user;
        this.type = type;
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
