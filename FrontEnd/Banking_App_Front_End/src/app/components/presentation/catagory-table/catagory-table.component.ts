import { Component, Input, OnInit, Signal } from '@angular/core';
import { User } from '../../../models/User.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catagory-table',
  imports: [CommonModule],
  templateUrl: './catagory-table.component.html',
  styleUrl: './catagory-table.component.css'
})
export class CatagoryTableComponent implements OnInit{

  @Input() currentUser! : Signal<User>

  ngOnInit(): void {
      console.log(this.currentUser().userCategories)
  }

}
