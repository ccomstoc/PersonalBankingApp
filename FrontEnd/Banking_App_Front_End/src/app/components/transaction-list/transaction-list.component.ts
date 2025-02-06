import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output, Signal, signal } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { catchError, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Transaction } from '../../models/Transaction.type';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User.type';
import { authGuard } from '../../gaurds/auth.guard';




@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {

  @Output() payTransactionEvent = new EventEmitter<number>();
  @Input() transactions!: Signal<Array<Transaction>>;
  @Input() balance!: Signal<number>;
  

  payTransaction(id:number){
    this.payTransactionEvent.emit(id);
  }
}