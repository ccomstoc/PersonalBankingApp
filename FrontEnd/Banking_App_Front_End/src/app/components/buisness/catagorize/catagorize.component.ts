import { Component, inject, OnChanges, OnDestroy, OnInit, signal, SimpleChanges } from '@angular/core';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { SortCardComponent } from "../../presentation/sort-card/sort-card.component";
import { CatagoryTableComponent } from "../../presentation/catagory-table/catagory-table.component";
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User.type';
import { CreateCategoryComponent } from "../../presentation/create-category/create-category.component";
import { ImplicitReceiver } from '@angular/compiler';
import { catchError, Subject, takeUntil } from 'rxjs';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-catagorize',
  imports: [NavBarComponent, SortCardComponent, CatagoryTableComponent, CreateCategoryComponent],
  templateUrl: './catagorize.component.html',
  styleUrl: './catagorize.component.css'
})
export class CatagorizeComponent implements OnDestroy, OnInit,OnChanges{

  authService = inject(AuthService);
  categoryService = inject(CategoryService);
  private destroy$ = new Subject<void>();

  currentUser;
  
    constructor(){
      this.currentUser = signal<User>(this.authService.getCurrentUser());
    }

    ngOnInit(): void {
      
    }
    ngOnChanges(changes: SimpleChanges): void {
        
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

    createCategory(categoryName:string){
      this.categoryService.createCategory(categoryName,this.currentUser().userId).pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log(err);
          throw err;
        })
      ).subscribe((cat) => {
        //TODO: Schedule a hard refresh of the local user after updating off of request? Feel like im updating local user to much

        //Update user locally(fast)
        let tempUser:User = this.currentUser();
        tempUser.userCategories.push(cat);
        this.updateUser(tempUser);
        //then refresh entire local user
        this.refreshUser();
      })
    }
    deleteCategory(catId:number){
      console.log()
      this.categoryService.deleteCategory(catId).pipe(
        takeUntil(this.destroy$),
        catchError((err)=>{
          console.log(err);
          throw err;
        })
      ).subscribe((success) =>{
          console.log("Cat deletion success")
          this.refreshUser();
      })
    }


    

    updateUser(newUser:User){
      this.authService.setCurrentUser(newUser);
      console.log("Current User changed in cat Component")
      this.currentUser.set(newUser);
    }
    refreshUser(){
      this.authService.refreshCurrentUser(() => {
        this.currentUser.set(this.authService.getCurrentUser())
      })
    }

}
