import { Component, computed, effect, EventEmitter, Input, OnInit, Output, signal, Signal } from '@angular/core';
import { User } from '../../../models/User.type';
import { CommonModule } from '@angular/common';
import { Category } from '../../../models/Category.type';
import { CategoryWithStats } from '../../../models/CategoryWithStats.type';

@Component({
  selector: 'app-catagory-table',
  imports: [CommonModule],
  templateUrl: './catagory-table.component.html',
  styleUrl: './catagory-table.component.css'
})
export class CatagoryTableComponent implements OnInit {

  @Input() categoryTable!: Signal<Array<CategoryWithStats>>;
  @Output() deleteCategoryEvent = new EventEmitter<number>();


  localCatTable = signal<Array<CategoryWithStats>>([]);




  ngOnInit(): void {
    // Create an effect that updates the local table with a sorted copy
    
  }

  deleteCategory(categoryName: string, catId: number) {
    if (window.confirm("Are you sure you want to delete: " + categoryName)) {
      this.deleteCategoryEvent.emit(catId);
    }
  }
}
