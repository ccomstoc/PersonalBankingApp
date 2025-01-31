package com.infosys.PersonalBankingApp.Controllers;

import com.infosys.PersonalBankingApp.Models.Transaction;
import com.infosys.PersonalBankingApp.Services.TransactionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("transaction")
@CrossOrigin
public class TransactionController {

    protected static final Logger log = LoggerFactory.getLogger(TransactionController.class);
    private TransactionService tService;

    public TransactionController(TransactionService tService) {
        this.tService = tService;
    }
    @GetMapping("/userId/{userId}")
    public ResponseEntity<List<Transaction>> findUsersTransactions(@PathVariable int userId){
        log.info("ControllerReached");
        return ResponseEntity.status(200).body(tService.getUsersTransactions(userId));
    }
    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) throws Exception{
        log.info("ControllerReached");
        return ResponseEntity.status(201).body(tService.createTransaction(transaction));
    }
    @PutMapping("pay/{transactionId}")
    public ResponseEntity<Double> payTransaction(@PathVariable int transactionId) throws Exception {
        log.info("ControllerReached");
        return ResponseEntity.status(200).body(tService.payTransaction(transactionId));
    }

}
