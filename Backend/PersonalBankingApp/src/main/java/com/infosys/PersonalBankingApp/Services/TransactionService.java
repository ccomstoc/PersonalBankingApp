package com.infosys.PersonalBankingApp.Services;

import com.infosys.PersonalBankingApp.DAOs.CategoryDAO;
import com.infosys.PersonalBankingApp.DAOs.TransactionDAO;
import com.infosys.PersonalBankingApp.DAOs.UserDAO;
import com.infosys.PersonalBankingApp.Exceptions.*;
import com.infosys.PersonalBankingApp.Models.Category;
import com.infosys.PersonalBankingApp.Models.DTOs.CategoryStatisticsDTO;
import com.infosys.PersonalBankingApp.Models.Enums.TransactionType;
import com.infosys.PersonalBankingApp.Models.Transaction;
import com.infosys.PersonalBankingApp.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TransactionService {

    private TransactionDAO tDAO;
    private UserDAO uDAO;
    private CategoryDAO cDAO;

    @Autowired
    public TransactionService(TransactionDAO tDAO, UserDAO uDAO,CategoryDAO cDAO) {
        this.tDAO = tDAO;
        this.uDAO = uDAO;
        this.cDAO = cDAO;

    }

    public List<Transaction> getUsersTransactions(int id){
        return tDAO.findByUserUserIdSorted(id);
    }

    @Transactional
    public double payTransaction(int transactionID) throws Exception{
        Transaction transaction = tDAO.findById(transactionID).orElseThrow(
                () -> new TransactionNotFoundException("Transaction could not be found"));

        if(transaction.isPaid())
            throw new TransactionAlreadyPaid("Transaction was already paid on: " + transaction.getPaidOn().toString());

        User user = uDAO.findById(transaction.getUser().getUserId()).orElseThrow(
                () -> new UserNotFoundException("User could not be found"));

        if(transaction.getAmount() > user.getBalance())
            throw new InsufficientBalanceException("User has insufficient balance to pay transaction of value: "+ transaction.getAmount());

        //User has enough balance

        user.setBalance(user.getBalance()-transaction.getAmount());
        transaction.setPaid(true);
        transaction.setPaidOn(LocalDate.now());

        uDAO.save(user);
        tDAO.save(transaction);

        return user.getBalance();

    }


    public Transaction createTransaction(Transaction transaction) throws UserNotFoundException{

        Optional<User> user;
        if (transaction.getUser() == null){
            user = uDAO.findById(transaction.getUserId());
            if(user.isPresent())
                transaction.setUser(user.get());
            else
                throw new UserNotFoundException("User Id not found when creating new transaction");
        }

        return tDAO.save(transaction);
    }

    public Transaction patchTransaction(Map<String,String> patchTransaction) throws Exception{
        if(!(patchTransaction.containsKey("transactionId"))){
            throw new TransactionNotFoundException("Transaction id was not provided");
        }
        int transactionId = Integer.parseInt(patchTransaction.get("transactionId"));
        Transaction transaction = tDAO.findById(transactionId).orElseThrow(
                () ->  new TransactionNotFoundException("Transaction id not found")
        );
        //TODO: Add rest of transaction key detection
        if(patchTransaction.containsKey("categoryId")){
            int categoryId = Integer.parseInt(patchTransaction.get("categoryId"));
            Category cat =  cDAO.findById(categoryId).orElseThrow(
                    () -> new CategoryNotFoundException("Category not found when patching transaction")
            );
            transaction.setCategory(cat);
            System.out.println("Transaction " + transaction.getTransactionId() + " set to cat: " + cat.getCategoryId());
        }


        return tDAO.save(transaction);


    }
    public List<Transaction> getUncategorizedTransactions(int userId){
        return tDAO.findByUserUserIdAndCategory(userId,null);

    }

    public CategoryStatisticsDTO getCategoryStatistics(int categoryId){

        int num = tDAO.getNumTransactionPerCategory(categoryId);

        Optional<Double> amountOptional = tDAO.getAmountPerCategory(categoryId);
        double amount;
        if(amountOptional.isPresent())
            amount = amountOptional.get();
        else
            amount = 0;

        //if()
        return new CategoryStatisticsDTO(num,amount) ;
    }
}
