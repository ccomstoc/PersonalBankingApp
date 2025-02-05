import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-base-user',
  imports: [],
  templateUrl: './base-user.component.html',
  styleUrl: './base-user.component.css'
})
export class BaseUserComponent implements OnInit{

  currentUser!: User;
  private subscription!: Subscription;

  authService = inject(AuthService);



  ngOnInit(): void {

    if(this.subscription != undefined){//Ensures subsription is not already set
      this.subscription = this.authService.loggedInUser$.subscribe(user => {
        if (user != null) {
          this.currentUser = user;
        } else {
          throw Error("null user tried to access user only page");
        }
      });
    }
    
  }


}
