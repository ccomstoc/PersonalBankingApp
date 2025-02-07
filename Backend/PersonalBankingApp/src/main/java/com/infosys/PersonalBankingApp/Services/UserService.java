package com.infosys.PersonalBankingApp.Services;

import com.infosys.PersonalBankingApp.DAOs.UserDAO;
import com.infosys.PersonalBankingApp.Exceptions.UserNotFoundException;
import com.infosys.PersonalBankingApp.Models.DTOs.DepositDTO;
import com.infosys.PersonalBankingApp.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private UserDAO uDAO;

    @Autowired
    public UserService(UserDAO uDAO) {
        this.uDAO = uDAO;
    }

    public User getUser(int id)throws UserNotFoundException{
        Optional<User> u =uDAO.findById(id);
        if(u.isEmpty())
            throw new UserNotFoundException("User id not found");
        return u.get();
    }

    public User createUser(User user){
       return uDAO.save(user);
    }

    public User makeDeposit(DepositDTO deposit) throws UserNotFoundException{
        User user = uDAO.findById(deposit.getUserId()).orElseThrow(
                () ->  new UserNotFoundException("User could not be found while making deposit")
        );
        user.setBalance(user.getBalance()+deposit.getAmount());
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
}
