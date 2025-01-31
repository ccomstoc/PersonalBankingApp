package com.infosys.PersonalBankingApp.Controllers;

import com.infosys.PersonalBankingApp.Models.User;
import com.infosys.PersonalBankingApp.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
@CrossOrigin
public class UserController {

    private UserService uService;

    @Autowired
    UserController(UserService uService){
        this.uService = uService;
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) throws Exception{
        return ResponseEntity.status(200).body(uService.getUser(id));
    }
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User newUser){
        return ResponseEntity.status(201).body(uService.createUser(newUser));
    }

}
