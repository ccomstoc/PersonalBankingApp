package com.infosys.PersonalBankingApp.Services;

import com.infosys.PersonalBankingApp.DAOs.UserDAO;
import com.infosys.PersonalBankingApp.Models.DTOs.LoginDTO;
import com.infosys.PersonalBankingApp.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    UserDAO uDAO;

    @Autowired
    public AuthService(UserDAO uDAO) {
        this.uDAO = uDAO;
    }

    public User login(LoginDTO loginDTO){
        return uDAO.findByUserNameAndPassword(loginDTO.getUserName(),loginDTO.getPassword());
    }
}
