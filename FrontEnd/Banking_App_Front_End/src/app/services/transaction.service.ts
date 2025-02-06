import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction } from '../models/Transaction.type';
import { TransactionDTO } from '../models/TransactionDTO.type';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  http = inject(HttpClient);
  
  getAllTransactions(userId:number){
    let url:string = "http://localhost:8080/transaction/userId/" + userId;
      return this.http.get<Array<Transaction>>(url);
  }

  payTransaction(transactionId:number){
    let url:string = "http://localhost:8080/transaction/pay/" + transactionId;
    return this.http.put<number>(url,null);
  }

  createTransaction(transaction:TransactionDTO){
    let url:string = "http://localhost:8080/transaction" ;
    return this.http.post(url,transaction);
  }

}
