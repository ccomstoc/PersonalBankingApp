import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { TransactionListComponent } from "../transaction-list/transaction-list.component";
import { CreateTransactionComponent } from "../create-transaction/create-transaction.component";
import { MakeDepositComponent } from "../make-deposit/make-deposit.component";

@Component({
  selector: 'app-home',
  imports: [NavBarComponent, TransactionListComponent, CreateTransactionComponent, MakeDepositComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
