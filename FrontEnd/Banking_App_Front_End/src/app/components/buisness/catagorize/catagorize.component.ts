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
import { Category } from '../../../models/Category.type';

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

      //dont popluate until use effect
      let tempUser:User = this.authService.getCurrentUser();
      //invalidate User, letting effect know it should not re-render until user is updated and valid
      tempUser.valid = false;
      this.currentUser = signal<User>(tempUser);
      this.uncatTransactionList = signal<Array<Transaction>>([])
      this.categoryTable = signal<Array<CategoryWithStats>>([]);


      effect(() =>{//update when user signal is changed, user signal is changed after refesh user call back function is run
        
        //if user is populated, then run
        //prevents double rendering when refresh user is called in onInit
        if(this.currentUser().valid){
          this.createCategoryTable(this.currentUser());
          console.log("EFFECT")
          console.log(JSON.stringify(this.currentUser()) + " !!!User updated!!!");
        }
      })
    }

    ngOnInit(): void {
      console.log("on intit")
      this.authService.refreshUser(this.currentUser);
      this.updateUncatagorizedTransactions();
      //this.createCategoryTable(this.currentUser());
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
        this.authService.refreshUser(this.currentUser);
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
          this.authService.refreshUser(this.currentUser);
          
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
        //console.log("TransactionList:")
        //console.log(transactionList)
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
        this.refreshCategoryTable(updatedTransaction);//Way better preformance conpared to full user refresh

        //Locally update the sort card list, because a full refresh would be inefficent, and previously assigned categories would be absent
        let updatedList = this.uncatTransactionList()
        if(setCategoryDTO.uncatListIndex != undefined){//Type check
          
          updatedList[setCategoryDTO.uncatListIndex] = updatedTransaction;
          this.uncatTransactionList.set(updatedList);
        }
        else{
          throw new Error("uncatTransactions index not provided when required ");
        }


      })

    }

    createCategoryTable(currentUser:User){

      let userCategories = currentUser.userCategories
      //function works by adding to current array, so need to reset
      this.categoryTable.set([])
      
      
      for(let i = 0; i < userCategories.length; i++){
        console.log(i);
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
          let tableEntry = {
            categoryId:userCategories[i].categoryId,
            name:userCategories[i].name,
            userId:userCategories[i].userId,
            countTransaction:catStatistics.countTransaction,
            sumAmount:catStatistics.sumAmount
          }
          this.categoryTable().push(tableEntry);
          
          console.log(this.categoryTable()[this.categoryTable().length-1].name + " cat Table above")
        }))
        

      }
    }

    refreshCategoryTable(transaction:Transaction){
      this.categoryTable().forEach((entry) => console.log(JSON.stringify(entry.categoryId)));
      //console.log(JSON.stringify(transaction.category?.categoryId));
      let matchingCategoryIndex = this.categoryTable().findIndex((catWithStats) => { return transaction.category?.categoryId == catWithStats.categoryId});
      //console.log(matchingCategoryIndex);
      if(matchingCategoryIndex == -1)
          throw new Error("categoryTable refresh unsuccessful, category not found")
      let table= this.categoryTable()
      table[matchingCategoryIndex].sumAmount += transaction.amount;
      table[matchingCategoryIndex].countTransaction++;
      this.categoryTable.set(table);
    }


    

    updateUser(newUser:User){
      this.authService.setCurrentUser(newUser);
      //console.log("Current User changed in cat Component")
      this.currentUser.set(newUser);
    }
    

}
