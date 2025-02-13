import { Component, EventEmitter, Input, OnInit, Output, Signal } from '@angular/core';
import { User } from '../../../models/User.type';
import { CommonModule } from '@angular/common';
import { Category } from '../../../models/Category.type';

@Component({
  selector: 'app-catagory-table',
  imports: [CommonModule],
  templateUrl: './catagory-table.component.html',
  styleUrl: './catagory-table.component.css'
})
export class CatagoryTableComponent implements OnInit{

  @Input() currentUser! : Signal<User>
  @Output() deleteCategoryEvent = new EventEmitter<number>;

  

  ngOnInit(): void {
      console.log(this.currentUser().userCategories)
  }

  deleteCategory(categoryName:string, catId:number){
    if(window.confirm("Are you sure you want to delete: " + categoryName)){
      this.deleteCategoryEvent.emit(catId);
    }
      
  }

}
