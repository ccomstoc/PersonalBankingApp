import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction } from '../models/Transaction.type';
import { TransactionDTO } from '../models/TransactionDTO.type';
import { User } from '../models/User.type';
import { SetCategoryDTO } from '../models/DTO/SetCategoryDTO.type';
import { environment } from '../Config/properties';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  http = inject(HttpClient);
  
  getAllTransactions(userId:number){
    let url:string = environment.baseBackendUrl + "transaction/userId/" + userId;
      return this.http.get<Array<Transaction>>(url);
      
  }

  payTransaction(transactionId:number){
    let url:string = environment.baseBackendUrl + "transaction/pay/" + transactionId;
    return this.http.put<number>(url,null);
  }

  createTransaction(transaction:TransactionDTO){
    let url:string = environment.baseBackendUrl + "transaction" ;
    return this.http.post<User>(url,transaction);
  }

  getUncatagorizedTransaction(userId:number){
    let url:string = environment.baseBackendUrl + "transaction/uncategorized/" + userId;
    return this.http.get<Array<Transaction>>(url);
  }

  assignCategory(body:SetCategoryDTO){
    let url:string = environment.baseBackendUrl + "transaction";
    return this.http.patch<Transaction>(url,body);
  }

  getTransactionCategoryStatistics(categoryId:number){
    let url:string = environment.baseBackendUrl + "transaction/categoryStatistics/" + categoryId;
    return this.http.get<any>(url);

  }

}
