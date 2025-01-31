package com.infosys.PersonalBankingApp.Services;

import com.infosys.PersonalBankingApp.DAOs.UserDAO;
import com.infosys.PersonalBankingApp.Exceptions.UserNotFoundException;
import com.infosys.PersonalBankingApp.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
