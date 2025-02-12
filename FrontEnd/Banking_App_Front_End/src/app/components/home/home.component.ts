import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { catchError, Subject, Subscription, takeUntil } from 'rxjs';
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

export class HomeComponent implements OnInit, OnDestroy {

  //Dependencies
  userService = inject(UserService);
  authService = inject(AuthService);
  changeDetect = inject(ChangeDetectorRef);
  transactionService = inject(TransactionService);
  private destroy$ = new Subject<void>();

  //Signals
  transactions = signal<Array<Transaction>>([]);
  balance = signal<number>(0);
  currentUser;

  constructor(){
    this.currentUser = signal<User>(this.authService.getCurrentUser());
  }

  ngOnInit(): void {  
    this.updateTransaction();
    console.log("Home init")
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  //________________ACTIONS________________
  //_______________________________________

  payTransaction(id:number){
    this.transactionService.payTransaction(id).pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
        console.log(err);
        throw err;
      })//Comment
    ).subscribe((newBalance) => {
      //modify to return user?
      
      let user:User = this.currentUser();
      user.balance = newBalance;
      this.updateUser(user);
      this.updateTransaction();

    });

  }


  createTransaction(transaction:TransactionDTO){
    this.transactionService.createTransaction(transaction)
          .pipe(
            takeUntil(this.destroy$),
            catchError((err) => {
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
    this.userService.makeDeposit(updatedUser).pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
      console.log(err);
      throw err;
    })).subscribe((newUser) => {
      this.updateUser(newUser);
    })
  }



  //________________UPDATES________________
  //_______________________________________
  updateUser(newUser:User){
    this.authService.setCurrentUser(newUser);
    this.currentUser.set(newUser);
  }

  updateTransaction(){
    console.log("updatetransStart");
    this.transactionService.getAllTransactions(this.currentUser().userId).pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    ).subscribe((returnedTransactions) => {
      console.log("updatetransSubsribe")
      this.transactions.set(returnedTransactions);
    })
    console.log("updatetransReturn")

  }
  refreshUser(){
    this.authService.refreshCurrentUser(() => {
      this.currentUser.set(this.authService.getCurrentUser())
    })
  }



    




}
