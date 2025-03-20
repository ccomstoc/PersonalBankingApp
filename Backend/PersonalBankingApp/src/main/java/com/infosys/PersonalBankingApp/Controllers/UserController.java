package com.infosys.PersonalBankingApp.Controllers;

import com.infosys.PersonalBankingApp.Exceptions.UserNotFoundException;
import com.infosys.PersonalBankingApp.Models.DTOs.DepositDTO;
import com.infosys.PersonalBankingApp.Models.DTOs.TransferDTO;
import com.infosys.PersonalBankingApp.Models.User;
import com.infosys.PersonalBankingApp.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Deque;
import java.util.Map;

@RestController
@RequestMapping("user")
@CrossOrigin
public class UserController {

    private final UserService uService;

    @Autowired
    UserController(UserService uService){
        this.uService = uService;
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) throws Exception{
        return ResponseEntity.status(200).body(uService.getUser(id));
    }
    @GetMapping("/username/{username}")
    public ResponseEntity<User> findByUsername(@PathVariable String username){
        return ResponseEntity.status(200).body(uService.findUserByUsername(username));
    }
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User newUser){
        return ResponseEntity.status(201).body(uService.createUser(newUser));
    }

    @PatchMapping
    public ResponseEntity<User> updateUser(@RequestBody Map<String,String> newUser) throws UserNotFoundException {
        return ResponseEntity.status(200).body(uService.updateUser(newUser));
    }

    @PatchMapping("/deposit")
    public ResponseEntity<User> makeDeposit(@RequestBody DepositDTO deposit)throws UserNotFoundException{
        return ResponseEntity.status(200).body(uService.makeDeposit(deposit));
    }

    @PatchMapping("/transfer")
    public ResponseEntity<User> transfer(@RequestBody TransferDTO tDTO) throws Exception{
        return ResponseEntity.status(200).body(uService.transferMoney(tDTO.getSendingUserId(),tDTO.getReceivingUserId(),tDTO.getAmount()));
    }





}
