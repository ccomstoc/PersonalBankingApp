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
import { BaseUserComponent } from '../base-user/base-user.component';



@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule, FormsModule, NavBarComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent extends BaseUserComponent implements OnInit {

  //Dependencies
  userService = inject(UserService);
  //authService = inject(AuthService);
  changeDetect = inject(ChangeDetectorRef);
  transactionService = inject(TransactionService);

  //twoWayDataBinding
  inputValue!:number


  // currentUser!: User;
  // private subscription!: Subscription;
  
  //Signals
  transactions = signal<Array<Transaction>>([]);
  balance = signal<number>(0);
  userId = signal<number>(1)
  

  buttonPress(){
    this.updateBalence();
    this.updateTransaction();//new

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


    this.userService.getUserById(this.currentUser.userId).pipe(catchError((err) => {
      console.log(err);
      throw err;
    })).subscribe((user) => {
      this.balance.set(user.balance)
    });
  }

  updateTransaction(){

    this.transactionService.getAllTransactions(this.currentUser.userId).pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    ).subscribe((returnedTransactions) => {
      this.transactions.set(returnedTransactions);
    })

  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.updateTransaction();
    this.updateBalence();

  }


}
