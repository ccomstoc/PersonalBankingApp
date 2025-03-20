package com.infosys.PersonalBankingApp.Services;

import com.infosys.PersonalBankingApp.DAOs.TransactionDAO;
import com.infosys.PersonalBankingApp.DAOs.UserDAO;
import com.infosys.PersonalBankingApp.Exceptions.InsufficientBalanceException;
import com.infosys.PersonalBankingApp.Exceptions.UserNotFoundException;
import com.infosys.PersonalBankingApp.Models.DTOs.DepositDTO;
import com.infosys.PersonalBankingApp.Models.Enums.TransactionType;
import com.infosys.PersonalBankingApp.Models.Transaction;
import com.infosys.PersonalBankingApp.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private UserDAO uDAO;
    private TransactionService tService;

    @Autowired
    public UserService(UserDAO uDAO, TransactionService tService) {
        this.tService = tService;
        this.uDAO = uDAO;
    }

    public User getUser(int id)throws UserNotFoundException{
        Optional<User> u =uDAO.findById(id);
        if(u.isEmpty())
            throw new UserNotFoundException("User id not found");
        return u.get();
    }

    public User createUser(User user){
        user.setBalance(0);
       return uDAO.save(user);
    }

    public User findUserByUsername(String username){
        return uDAO.findByUserName(username);
    }

    @Transactional
    public User makeDeposit(DepositDTO deposit) throws UserNotFoundException{
        User user = uDAO.findById(deposit.getUserId()).orElseThrow(
                () ->  new UserNotFoundException("User could not be found while making deposit")
        );
        user.setBalance(user.getBalance()+deposit.getAmount());
        //need to make a new deposit transaction
        Transaction transaction = new Transaction();

        transaction.setAmount(deposit.getAmount());
        transaction.setUserId(deposit.getUserId());
        transaction.setDate(LocalDate.now());
        transaction.setDescription("Deposit");
        transaction.setPaid(true);
        transaction.setPaidOn(LocalDate.now());
        transaction.setType(TransactionType.DEPOSIT);


        tService.createTransaction(transaction);
        return uDAO.save(user);
    }

    public User updateUser(Map<String, String> newUser)throws UserNotFoundException{
        User user = uDAO.findById(Integer.parseInt(newUser.get("userId"))).orElseThrow(
                () ->  new UserNotFoundException("User could not be found while making deposit")
        );

        if(newUser.containsKey("userName"))
            user.setUserName(newUser.get("userName"));
        if(newUser.containsKey("name"))
            user.setName(newUser.get("name"));
        if(newUser.containsKey("balance"))
            user.setBalance(Double.parseDouble(newUser.get("balance")));

        //TODO: Very unsecure
        if(newUser.containsKey("password"))
            user.setPassword(newUser.get("password"));

        return uDAO.save(user);
    }

    @Transactional
    public User transferMoney(int userId, int receivingUserId,double amount) throws Exception{

        //get both users
        //update amount in accounts
        //make transactions for both
        //persist
        User sendingUser = uDAO.findById(userId).orElseThrow(() -> new UserNotFoundException("sending user could not be found when making transfer"));
        if(sendingUser.getBalance()<amount)
            throw new InsufficientBalanceException("Sending user does not have sufficient balance");
        User receivingUser = uDAO.findById(receivingUserId).orElseThrow(() -> new UserNotFoundException("Receiving User could not be found"));

        sendingUser.setBalance(sendingUser.getBalance()-amount);
        receivingUser.setBalance(receivingUser.getBalance()+amount);

        Transaction sendingTransaction = new Transaction();
            sendingTransaction.setUser(sendingUser);
            sendingTransaction.setType(TransactionType.TRANSFER);
            sendingTransaction.setDescription("Transfer to " + receivingUser.getUserName());
            sendingTransaction.setDate(LocalDate.now());
            sendingTransaction.setPaid(true);
            sendingTransaction.setPaidOn(LocalDate.now());
            sendingTransaction.setAmount(amount);

        Transaction receivingTransaction = new Transaction();
            receivingTransaction.setUser(receivingUser);
            receivingTransaction.setType(TransactionType.DEPOSIT);
            receivingTransaction.setDescription("Transfer from " + sendingUser.getUserName());
            receivingTransaction.setDate(LocalDate.now());
            receivingTransaction.setPaid(true);
            receivingTransaction.setPaidOn(LocalDate.now());
            receivingTransaction.setAmount(amount);

        tService.createTransaction(sendingTransaction);
        tService.createTransaction(receivingTransaction);
        uDAO.save(receivingUser);
        return uDAO.save(sendingUser);

    }


}
