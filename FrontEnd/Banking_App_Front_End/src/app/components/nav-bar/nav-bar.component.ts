import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../models/User.type';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { BaseUserComponent } from '../base-user/base-user.component';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent extends BaseUserComponent implements OnInit{

  override ngOnInit(): void {
      super.ngOnInit()

  }

  logout(){
    this.authService.logout()
  }

  

}
