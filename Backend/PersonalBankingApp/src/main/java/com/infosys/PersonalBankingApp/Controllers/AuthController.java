package com.infosys.PersonalBankingApp.Controllers;

import com.infosys.PersonalBankingApp.Models.DTOs.LoginDTO;
import com.infosys.PersonalBankingApp.Models.User;
import com.infosys.PersonalBankingApp.Services.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("login")
@CrossOrigin
public class AuthController {

    protected static final Logger log = LoggerFactory.getLogger(AuthController.class);

    AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<User> login(@RequestBody LoginDTO loginDTO){
        log.info("User: " + loginDTO.getUserName());
        log.info("Pass: " + loginDTO.getPassword());

        User user = authService.login(loginDTO);
        if(user == null){
            log.info("Login Failed");
            return ResponseEntity.status(401).body(null);
        }
        log.info("Login Successful");
        return ResponseEntity.status(200).body(user);
    }

}
