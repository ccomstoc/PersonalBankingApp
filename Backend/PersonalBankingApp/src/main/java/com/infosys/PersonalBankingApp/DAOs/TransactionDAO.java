package com.infosys.PersonalBankingApp.DAOs;

import com.infosys.PersonalBankingApp.Models.Category;
import com.infosys.PersonalBankingApp.Models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionDAO extends JpaRepository<Transaction,Integer> {


    List<Transaction> findByUserUserId(int id);
    public List<Transaction> findByUserUserIdAndCategory(int userId, Category cat);
}
