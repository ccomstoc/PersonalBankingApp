import { Component, inject } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { FormsModule } from '@angular/forms';

import {TransactionDTO} from '../../models/TransactionDTO.type'
import { catchError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-transaction',
  imports: [FormsModule],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.css'
})
export class CreateTransactionComponent {
    transactionService = inject(TransactionService);
    authService = inject(AuthService)
    router = inject(Router)


    loggedInUser = this.authService.getCurrentUser()

    date = new Date().toISOString().split('T')[0];
    description!:string;
    amount!:number;
    isPaid:boolean = false;



    createTransaction(){
      if(this.description && this.amount){
        const transaction:TransactionDTO = {
            description:this.description,
            amount:this.amount,
            date:this.date,
            //isPaid:this.isPaid,
            userId:this.loggedInUser.userId

          };
          console.log(transaction);
          
          this.transactionService.createTransaction(transaction)
          .pipe(catchError((err) => {
            console.log(err);
            throw err;
          })).subscribe((newTransaction) => {
            console.log(newTransaction);
            
          })
          
          //hard reload, look into other solutions
          window.location.reload()
          
      } else { 
        //Show error 
      }
    }
}
