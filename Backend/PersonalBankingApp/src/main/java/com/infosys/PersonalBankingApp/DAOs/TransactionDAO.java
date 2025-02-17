package com.infosys.PersonalBankingApp.DAOs;

import com.infosys.PersonalBankingApp.Models.Category;
import com.infosys.PersonalBankingApp.Models.DTOs.CategoryStatisticsDTO;
import com.infosys.PersonalBankingApp.Models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionDAO extends JpaRepository<Transaction,Integer> {


    List<Transaction> findByUserUserId(int id);

    public List<Transaction> findByUserUserIdAndCategory(int userId, Category cat);



    @Query("SELECT COUNT(t) FROM Transaction t " +
            "WHERE t.category.categoryId = :categoryId ")
    int getNumTransactionPerCategory(@Param("categoryId") int categoryId);
    //com/infosys/PersonalBankingApp/Models/DTOs/CategoryStatisticsDTO.java
    @Query("SELECT SUM(t.amount) FROM Transaction t " +
            "WHERE t.category.categoryId = :categoryId ")
    Optional<Double> getAmountPerCategory(@Param("categoryId") int categoryId);

}
