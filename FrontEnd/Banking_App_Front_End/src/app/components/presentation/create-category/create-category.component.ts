import { Component, EventEmitter, inject, Input, Output, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/User.type';
import { CategoryService } from '../../../services/category.service';
import { catchError, Subject } from 'rxjs';
import { CreateCategoryDTO } from '../../../models/DTO/CreateCategoryDTO';
import { SetCategoryDTO } from '../../../models/DTO/SetCategoryDTO.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-category',
  imports: [FormsModule,CommonModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {

  @Input() currentUser!:Signal<User>;
  @Output() createCategoryEvent = new EventEmitter<CreateCategoryDTO>;

  private destroy$ = new Subject<void>();

  categoryService = inject(CategoryService);
  categoryType!:string;
  categoryName!:string;

  missingValue:boolean = false;

  //Lift to parent
  createCategory(){
    this.missingValue = false;

    if(!this.categoryName || !this.categoryType) {
      this.missingValue = true;
      return;
    }


    let catDTO:CreateCategoryDTO = {
      name:this.categoryName,
      userId:this.currentUser().userId,
      type:this.categoryType

    }
    this.createCategoryEvent.emit(catDTO);
    
  }

}
