import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { User } from '../../../models/User.type';
import { Category } from '../../../models/Category.type';
import { CategoryWithStats } from '../../../models/CategoryWithStats.type';
import { AuthService } from '../../../services/auth.service';
import { TransactionService } from '../../../services/transaction.service';
import { catchError, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CategoryCardsComponent } from "../../presentation/category-cards/category-cards.component";

@Component({
  selector: 'app-analyze',
  imports: [NavBarComponent, CommonModule, CategoryCardsComponent],
  templateUrl: './analyze.component.html',
  styleUrl: './analyze.component.css'
})
export class AnalyzeComponent implements OnInit, OnDestroy{

  authService = inject(AuthService);
  transactionService = inject(TransactionService)
  private destroy$ = new Subject<void>();

  categoryArray;
  currentUser;

  constructor(){
    let tempUser: User = this.authService.getCurrentUser();
    tempUser.valid = false;
    this.currentUser = signal<User>(tempUser);
    this.categoryArray = signal<Array<CategoryWithStats>>([]);

    effect(() => {
        if(this.currentUser().valid)//prevents double rendering of array on init, bc of refresh user
          this.createCategoryArray(this.currentUser())

        console.log(this.categoryArray())
    })

  }

  ngOnInit(): void {
      this.authService.refreshUser(this.currentUser);
      //this.createCategoryArray()
  }
  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

   createCategoryArray(currentUser:User = this.currentUser()){
        
        let userCategories = currentUser.userCategories

        //need to reset current array, as we are adding updated values to it
        this.categoryArray.set([])
        
        //retrieve stats for each category
        for(let i = 0; i < userCategories.length; i++){
          //console.log(userCategories.length + " length")
          //console.log("Stat request for id " + userCategories[i].categoryId + " name " + userCategories[i].name)
          this.transactionService.getTransactionCategoryStatistics(userCategories[i].categoryId).pipe(
            takeUntil(this.destroy$),
            catchError((err) => {
              console.log(err);
              throw err;
            })
          ).subscribe((catStatistics => {
            //If createCattable is called twice in quick succession, the clear table will not take effect properly
            let tableEntry:CategoryWithStats = {
              categoryId:userCategories[i].categoryId,
              name:userCategories[i].name,
              userId:userCategories[i].userId,
              countTransaction:catStatistics.countTransaction,
              sumAmount:catStatistics.sumAmount
            }
            //Add category with stats to array
            this.categoryArray().push(tableEntry);
            //console.log(this.categoryTable() + " cat Table above")
          }))
          
  
        }
      }

      

}
