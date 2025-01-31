package com.infosys.PersonalBankingApp.Services;

import com.infosys.PersonalBankingApp.DAOs.TransactionDAO;
import com.infosys.PersonalBankingApp.DAOs.UserDAO;
import com.infosys.PersonalBankingApp.Exceptions.InsufficientBalanceException;
import com.infosys.PersonalBankingApp.Exceptions.TransactionAlreadyPaid;
import com.infosys.PersonalBankingApp.Exceptions.TransactionNotFoundException;
import com.infosys.PersonalBankingApp.Exceptions.UserNotFoundException;
import com.infosys.PersonalBankingApp.Models.Transaction;
import com.infosys.PersonalBankingApp.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    private TransactionDAO tDAO;
    private UserDAO uDAO;

    @Autowired
    public TransactionService(TransactionDAO tDAO, UserDAO uDAO) {
        this.tDAO = tDAO;
        this.uDAO = uDAO;

    }

    public List<Transaction> getUsersTransactions(int id){
        return tDAO.findByUserUserId(id);
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
}
