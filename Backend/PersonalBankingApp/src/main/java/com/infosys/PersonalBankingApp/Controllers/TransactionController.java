package com.infosys.PersonalBankingApp.Controllers;

import com.infosys.PersonalBankingApp.Models.DTOs.CategoryStatisticsDTO;
import com.infosys.PersonalBankingApp.Models.Transaction;
import com.infosys.PersonalBankingApp.Services.TransactionService;
import jakarta.websocket.server.PathParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("transaction")
@CrossOrigin
public class TransactionController {

    protected static final Logger log = LoggerFactory.getLogger(TransactionController.class);
    private TransactionService tService;//update

    public TransactionController(TransactionService tService) {
        this.tService = tService;
    }
    @GetMapping("/userId/{userId}")
    public ResponseEntity<List<Transaction>> findUsersTransactions(@PathVariable int userId){

        return ResponseEntity.status(200).body(tService.getUsersTransactions(userId));
    }
    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) throws Exception{

        return ResponseEntity.status(201).body(tService.createTransaction(transaction));
    }
    @PutMapping("pay/{transactionId}")
    public ResponseEntity<Double> payTransaction(@PathVariable int transactionId) throws Exception {
        return ResponseEntity.status(200).body(tService.payTransaction(transactionId));
    }
    @PatchMapping
    public ResponseEntity<Transaction> patchTransaction(@RequestBody Map<String,String> patchTransaction) throws Exception{
        return ResponseEntity.status(200).body(tService.patchTransaction(patchTransaction));

    }
    @GetMapping("uncategorized/{userId}")
    public ResponseEntity<List<Transaction>> getUncategorizedTransactions(@PathVariable int userId){
        return ResponseEntity.status(200).body(tService.getUncategorizedTransactions(userId));
    }
    @GetMapping("categoryStatistics/{catId}")
    ResponseEntity<CategoryStatisticsDTO> getStats(@PathVariable int catId){
        return ResponseEntity.status(200).body(tService.getCategoryStatistics(catId));
    }


}
