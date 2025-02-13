import { Component, EventEmitter, inject, Input, Output, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/User.type';
import { CategoryService } from '../../../services/category.service';
import { catchError, Subject } from 'rxjs';

@Component({
  selector: 'app-create-category',
  imports: [FormsModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {

  @Input() currentUser!:Signal<User>;
  @Output() createCategoryEvent = new EventEmitter<string>;

  private destroy$ = new Subject<void>();

  categoryService = inject(CategoryService);

  categoryName!:string;

  //Lift to parent
  createCategory(){
    this.createCategoryEvent.emit(this.categoryName);
    
  }

}
