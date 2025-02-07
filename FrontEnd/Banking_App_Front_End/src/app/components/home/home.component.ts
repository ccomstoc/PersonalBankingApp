import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { catchError, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Transaction } from '../../models/Transaction.type';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User.type';
import { TransactionListComponent } from "../transaction-list/transaction-list.component";
import { CreateTransactionComponent } from "../create-transaction/create-transaction.component";
import { MakeDepositComponent } from "../make-deposit/make-deposit.component";
import { TransactionDTO } from '../../models/TransactionDTO.type';
import { UpdateUserDTO } from '../../models/UpdateUserDTO.type';

@Component({
  selector: 'app-home',
  imports: [NavBarComponent, CommonModule, FormsModule, TransactionListComponent, CreateTransactionComponent, MakeDepositComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  //Dependencies
  userService = inject(UserService);
  authService = inject(AuthService);
  changeDetect = inject(ChangeDetectorRef);
  transactionService = inject(TransactionService);



  //currentUser: User = this.authService.getCurrentUser();

  
  //Signals
  transactions = signal<Array<Transaction>>([]);
  balance = signal<number>(0);
  currentUser = signal<User>(this.authService.getCurrentUser());

  ngOnInit(): void {  

    this.updateTransaction();
    this.updateBalence();

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

    this.userService.getUserById(this.currentUser().userId).pipe(catchError((err) => {
      console.log(err);
      throw err;
    })).subscribe((user) => {
      this.balance.set(user.balance)
    });
  }

  updateTransaction(){

    this.transactionService.getAllTransactions(this.currentUser().userId).pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    ).subscribe((returnedTransactions) => {
      this.transactions.set(returnedTransactions);
    })

  }
  updateUserDependents(){
    this.authService.refreshCurrentUser(() => {
      this.currentUser.set(this.authService.getCurrentUser())
    })
  }

  createTransaction(transaction:TransactionDTO){
    this.transactionService.createTransaction(transaction)
          .pipe(catchError((err) => {
            console.log(err);
            throw err;
          })).subscribe((newTransaction) => {
            console.log(newTransaction);
            this.updateTransaction();
            //Must be in here because it executes AFTER subscribe emits result
            //if put after, will not run because likey request has not gone through yet
            
          })
  }

  makeDeposit(amount:number){
    

    const updatedUser = {
      userId:this.currentUser().userId,
      amount:amount
    }
    console.log("New User in home comp" + updatedUser)
    this.userService.makeDeposit(updatedUser).pipe(catchError((err) => {
      console.log(err);
      throw err;
    })).subscribe((newUser) => {
      this.authService.setCurrentUser(newUser);
      this.currentUser.set(newUser);
    })
  }

    




}
