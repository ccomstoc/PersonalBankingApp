import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/User.type';
import { Transaction } from '../../../models/Transaction.type';






@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {

  @Output() payTransactionEvent = new EventEmitter<number>();
  @Input() currentUser!: Signal<User>
  @Input() transactions!: Signal<Array<Transaction>>;

  

  payTransaction(id:number){
    this.payTransactionEvent.emit(id);
  }
}