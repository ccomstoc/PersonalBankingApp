import { Component, EventEmitter, inject, Input, Output, Signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { TransactionDTO } from '../../../models/TransactionDTO.type';
import { User } from '../../../models/User.type';



@Component({
  selector: 'app-create-transaction',
  imports: [FormsModule],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.css'
})
export class CreateTransactionComponent {

    @Output() createTransactionEvent = new EventEmitter<TransactionDTO>;
    @Input() currentUser!: Signal<User>

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
            userId:this.currentUser().userId

          };
          this.createTransactionEvent.emit(transaction);
        
      } else { 
        //TODO: Error handle for invalid entry
      }
    }
}
