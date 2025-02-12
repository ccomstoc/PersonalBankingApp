import { Component, inject, signal } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { SortCardComponent } from "../sort-card/sort-card.component";
import { CatagoryTableComponent } from "../presentation/catagory-table/catagory-table.component";
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User.type';

@Component({
  selector: 'app-catagorize',
  imports: [NavBarComponent, SortCardComponent, CatagoryTableComponent],
  templateUrl: './catagorize.component.html',
  styleUrl: './catagorize.component.css'
})
export class CatagorizeComponent {

  authService = inject(AuthService);

  currentUser;
  
    constructor(){
      this.currentUser = signal<User>(this.authService.getCurrentUser());
    }

}
