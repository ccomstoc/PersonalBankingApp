import { Component, effect, ErrorHandler, inject, OnChanges, OnDestroy, OnInit, signal, SimpleChanges } from '@angular/core';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { SortCardComponent } from "../../presentation/sort-card/sort-card.component";
import { CatagoryTableComponent } from "../../presentation/catagory-table/catagory-table.component";
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User.type';
import { CreateCategoryComponent } from "../../presentation/create-category/create-category.component";
import { ImplicitReceiver } from '@angular/compiler';
import { catchError, Subject, takeUntil } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import { TransactionService } from '../../../services/transaction.service';
import { Transaction } from '../../../models/Transaction.type';
import { SetCategoryDTO } from '../../../models/DTO/SetCategoryDTO.type';
import { transition } from '@angular/animations';
import { CategoryWithStats } from '../../../models/CategoryWithStats.type';

@Component({
  selector: 'app-catagorize',
  imports: [NavBarComponent, SortCardComponent, CatagoryTableComponent, CreateCategoryComponent],
  templateUrl: './catagorize.component.html',
  styleUrl: './catagorize.component.css'
})
export class CatagorizeComponent implements OnDestroy, OnInit,OnChanges{

  authService = inject(AuthService);
  categoryService = inject(CategoryService);
  transactionService = inject(TransactionService);
  private destroy$ = new Subject<void>();

  

  currentUser;
  uncatTransactionList;
  categoryTable;
  
    constructor(){

      
      this.currentUser = signal<User>(this.authService.getCurrentUser());
      this.uncatTransactionList = signal<Array<Transaction>>([])
      this.categoryTable = signal<Array<CategoryWithStats>>([]);

      effect(() =>{
        this.createCategoryTable(this.currentUser());
      })
    }

    ngOnInit(): void {
      this.updateUncatagorizedTransactions();
      this.createCategoryTable(this.currentUser());
    }

    ngOnChanges(changes: SimpleChanges): void {
        
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

    createCategory(categoryName:string){
      //console.log
      this.categoryService.createCategory(categoryName,this.currentUser().userId).pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log(err);
          throw err;
        })
      ).subscribe((cat) => {
        //TODO: Schedule a hard refresh of the local user after updating off of request? Feel like im updating local user to much

        //Update user locally(fast)
      //   let tempUser:User = this.currentUser();
      //   tempUser.userCategories.push(cat);
      //  this.updateUser(tempUser);
        //then refresh entire local user
        this.refreshUser();
      })
    }

    deleteCategory(catId:number){

      this.categoryService.deleteCategory(catId).pipe(
        takeUntil(this.destroy$),
        catchError((err)=>{
          console.log(err);
          throw err;
        })
      ).subscribe((success) =>{
          console.log("Cat deletion success")
          this.updateUncatagorizedTransactions();//Having this before the user refresh allows items in the current uncat list to remain?
          //but only for one deletion
          this.refreshUser();
          
      })

      //this should? trigger a refresh of uncatTransaction list, potentially time to think about moving this feature elsewhere
      //
    }

    updateUncatagorizedTransactions(){
      this.transactionService.getUncatagorizedTransaction(this.currentUser().userId).pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log(err)
          throw err;
        })
      ).subscribe((transactionList) =>{
        this.uncatTransactionList.set(transactionList);
        //this is logged before table doubling bug
        console.log("TransactionList:")
        console.log(transactionList)
      })

    }

    assignCategory(setCategoryDTO:SetCategoryDTO){
      
      this.transactionService.assignCategory(setCategoryDTO).pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log(err);
          throw err; 
        })
      ).subscribe((updatedTransaction) => {
        //ensure local list is updated, without full update, which would remove element from list, to allow for corrections
        //Can do this with index because it is still current, assuming user didnt press next before 
        //response
       let updatedList = this.uncatTransactionList()//set index of incoming index, pass by reffernece to the value within child, alongside event$
        //tricky because its a signal
        if(setCategoryDTO.uncatListIndex != undefined){
          updatedList[setCategoryDTO.uncatListIndex] = updatedTransaction;
          this.uncatTransactionList.set(updatedList);
          this.refreshUser();
        }
        else{
          throw new Error("uncatTransactions index not provided when required ");
        }


      })

    }

    createCategoryTable(currentUser:User){
      console.log("User in createCatTable: " + JSON.stringify(currentUser), null, 2) ;
      let userCategories = currentUser.userCategories
      this.categoryTable.set([])
      for(let i = 0; i < userCategories.length; i++){
        console.log("Stat request for id " + userCategories[i].categoryId + " name " + userCategories[i].name)
        this.transactionService.getTransactionCategoryStatistics(userCategories[i].categoryId).pipe(
          takeUntil(this.destroy$),
          catchError((err) => {
            console.log(err);
            throw err;
          })
        ).subscribe((catStatistics => {
          let tableEntry = {
            categoryId:userCategories[i].categoryId,
            name:userCategories[i].name,
            userId:userCategories[i].userId,
            countTransaction:catStatistics.countTransaction,
            sumAmount:catStatistics.sumAmount
          }
          this.categoryTable().push(tableEntry);
          console.log(this.categoryTable() + " cat Table above")
        }))
        

      }
    }


    

    updateUser(newUser:User){
      this.authService.setCurrentUser(newUser);
      console.log("Current User changed in cat Component")
      this.currentUser.set(newUser);
    }
    refreshUser(){
      this.authService.refreshCurrentUser(() => {
        console.log('Fresh user')
        this.currentUser.set(this.authService.getCurrentUser())
        console.log("Current User Set");
      })
    }

}
