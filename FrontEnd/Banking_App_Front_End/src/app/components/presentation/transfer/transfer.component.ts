import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnDestroy, Output, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User.type';
import { catchError, Subject, take, takeUntil } from 'rxjs';
import { TransferDTO } from '../../../models/DTO/TransferDTO';

@Component({
  selector: 'app-transfer',
  imports: [FormsModule,CommonModule],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent implements OnDestroy{

  @Input() currentUser!: Signal<User>;
  @Output() transferEvent = new EventEmitter<TransferDTO>;

  userService = inject(UserService);
  private destroy$ = new Subject<void>;
  

  receivingUsername!:string
  amount!:number
  userFound:boolean = true;
  selfTransfer:boolean = false;

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

  sendMoney(){
    this.selfTransfer = false; 
    this.userFound = true;

    if(this.receivingUsername === this.currentUser().userName){
      this.selfTransfer = true;
      return;
    }

  

    this.userService.getByUsername(this.receivingUsername).pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    ).subscribe((user) => {
      if(!user){
        this.userFound = false;
      } else {
        let transferDTO:TransferDTO = {
          sendingUserId:this.currentUser().userId,
          receivingUserId:user.userId,
          amount:this.amount
        }
        this.transferEvent.emit(transferDTO);

      }
        
    })
    

  }

}
