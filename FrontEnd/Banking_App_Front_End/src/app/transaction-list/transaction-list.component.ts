import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Transaction } from '../models/transaction.type';
import { TransactionService } from '../services/transaction.service';
import { catchError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {
  inputValue:number = 1;
  transactionService = inject(TransactionService);
  userService = inject(UserService)
  changeDetect = inject(ChangeDetectorRef);
  transactions = signal<Array<Transaction>>([]);
  balance = signal<number>(0);

  buttonPress(){
    this.updateBalence();
    this.updateTransaction();

  }

  payTransaction(id:number){
    this.transactionService.payTransaction(id).pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })//Comment
    ).subscribe((newBalance) => {
      this.updateTransaction();
      this.balance.set(newBalance);

    });

    
  }

  updateBalence(){


    this.userService.getUserById(this.inputValue).pipe(catchError((err) => {
      console.log(err);
      throw err;
    })).subscribe((user) => {
      this.balance.set(user.balance)
    });
  }

  updateTransaction(){

    this.transactionService.getAllTransactions(this.inputValue).pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    ).subscribe((returnedTransactions) => {
      this.transactions.set(returnedTransactions);
    })

  }

  ngOnInit(): void {

    this.updateTransaction();
    this.updateBalence();

  }


}
