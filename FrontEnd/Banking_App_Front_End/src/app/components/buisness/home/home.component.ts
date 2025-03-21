import { ChangeDetectorRef, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import { catchError, Subject, Subscription, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { Transaction } from '../../../models/Transaction.type';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User.type';
import { MakeDepositComponent } from "../../presentation/make-deposit/make-deposit.component";
import { TransactionDTO } from '../../../models/TransactionDTO.type';
import { CreateTransactionComponent } from '../../presentation/create-transaction/create-transaction.component';
import { TransactionListComponent } from '../../presentation/transaction-list/transaction-list.component';
import { TransferComponent } from "../../presentation/transfer/transfer.component";
import { TransferDTO } from '../../../models/DTO/TransferDTO';
import { DepositDTO } from '../../../models/DTO/DepositDTO';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-home',
  imports: [NavBarComponent, CommonModule, FormsModule, TransactionListComponent, CreateTransactionComponent, MakeDepositComponent, TransferComponent],
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
  errorMessage:string = "";
  currentUser;

  constructor(){
    this.currentUser = signal<User>(this.authService.getCurrentUser());

    effect(()=>{
      
      this.errorMessage = "";
      console.log("ERRRRR " + this.errorMessage);
    })
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
      catchError((err:HttpErrorResponse) => {
        this.errorMessage = (err.error);
        console.log(err.error);
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
    
    
    const updatedUser:DepositDTO = {
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
      this.updateTransaction();
    })
  }

  transfer(transferDTO:TransferDTO){
    this.userService.transfer(transferDTO).pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    ).subscribe((user) =>{
      this.updateUser(user);
      this.updateTransaction();
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
      console.log(returnedTransactions)
      this.transactions.set(returnedTransactions);
    })
    console.log("updatetransReturn")

  }
 



    




}
