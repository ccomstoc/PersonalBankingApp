import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../models/User.type';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent{

  authSerice = inject(AuthService)
  loggedInUser = this.authSerice.getCurrentUser();

  logout(){
    this.authSerice.logout();
  }

  

}
