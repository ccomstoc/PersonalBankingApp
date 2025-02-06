import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionListComponent } from "./components/transaction-list/transaction-list.component";
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Banking_App_Front_End';
}
