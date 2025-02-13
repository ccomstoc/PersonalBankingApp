import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-make-deposit',
  imports: [FormsModule],
  templateUrl: './make-deposit.component.html',
  styleUrl: './make-deposit.component.css'
})
export class MakeDepositComponent {

  @Output() makeDepositEvent = new EventEmitter<number>;

  depositAmount!:number;

  makeDeposit(){
    if(this.depositAmount!=null){
      console.log("DO in depo comp: " + this.depositAmount)
      this.makeDepositEvent.emit(this.depositAmount);
    }
    else
      console.log("Deposit Field Empty");

  }


  

}
