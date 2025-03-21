import { Component, effect, EventEmitter, Input, OnChanges, OnInit, Output, signal, Signal, SimpleChanges } from '@angular/core';
import { User } from '../../../models/User.type';
import { Category } from '../../../models/Category.type';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../../models/Transaction.type';
import { SetCategoryDTO } from '../../../models/DTO/SetCategoryDTO.type';

@Component({
  selector: 'app-sort-card',
  imports: [CommonModule],
  templateUrl: './sort-card.component.html',
  styleUrl: './sort-card.component.css'
})
export class SortCardComponent implements OnChanges, OnInit{

  @Input() currentUser!: Signal<User>;
  @Input() uncatTransactionList!: Signal<Array<Transaction>>;
  @Output() assignCategoryEvent = new EventEmitter<SetCategoryDTO>
  @Output() listComplete = new EventEmitter<void>

  categoryButtonsSignal = signal<Array<Array<Category>>>([[]]);
  incomeCategoryButtonsSignal = signal<Array<Array<Category>>>([[]]);
  spendingCategoryButtonsSignal = signal<Array<Array<Category>>>([[]]);
  transactionListIndex = signal<number>(0);


  ngOnInit(): void {
    this.updateCategoryButtons()
  }

  constructor(){
    effect(() =>{//runs when signals are changed, so updates list when currentUserChanges

      this.updateCategoryButtons();
    })
  }
  //set signal = updateCatButons

  //categoryButtons:<Array<Array<Category>>> = [[]]

  ngOnChanges(changes: SimpleChanges): void {

    this.updateCategoryButtons()
      
  }
  buttonNext(){
    //console.log(this.transactionListIndex() +'next button' + this.uncatTransactionList().length)
    this.transactionListIndex.set(this.transactionListIndex()+1);
    //console.log(this.transactionListIndex() +'next button2' + this.uncatTransactionList().length)
    if(this.transactionListIndex() == this.uncatTransactionList().length){
      this.transactionListIndex.set(0);
      this.listComplete.emit();
    }
  }
  buttonPrevious(){
    this.transactionListIndex.set(this.transactionListIndex()-1);
  }

  //Translates the categories into 2d array for easy template rendering
  updateCategoryButtons(){

    let categoryButtons:Array<Array<Category>> = [[]];
    let incomeCategoryButtons:Array<Array<Category>> = [[]];
    let spendingCategoryButtons:Array<Array<Category>> = [[]];
    

    let categoryRowIndex = 0;
    for(let i = 0; i<this.currentUser().userCategories.length; i++){

      if(i%4 == 0 && i != 0){
          categoryRowIndex++;
          categoryButtons.push([]);
      }
      categoryButtons[categoryRowIndex].push(this.currentUser().userCategories[i]);

    }
    this.categoryButtonsSignal.set(categoryButtons);

    categoryRowIndex = 0;
    let skiped = 0;
  
    for(let i = 0; i<this.currentUser().userCategories.length; i++){
      if(this.currentUser().userCategories[i].type != "INCOME"){
        skiped++;
      }

      if((i-skiped)%4 == 0 && (i-skiped) != 0){
          categoryRowIndex++;
          incomeCategoryButtons.push([]);
      }
      incomeCategoryButtons[categoryRowIndex].push(this.currentUser().userCategories[i]);


    }
    this.incomeCategoryButtonsSignal.set(categoryButtons);

    skiped = 0;
    for(let i = 0; i<this.currentUser().userCategories.length; i++){
      if(this.currentUser().userCategories[i].type != "SPENDING"){
        skiped++;
      }

      if((i-skiped)%4 == 0 && (i-skiped) != 0){
          categoryRowIndex++;
          incomeCategoryButtons.push([]);
      }
      incomeCategoryButtons[categoryRowIndex].push(this.currentUser().userCategories[i]);


    }
    this.incomeCategoryButtonsSignal.set(categoryButtons);
    

  }

  assignCategory(categoryId:number){

    const  setCategoryDTO:SetCategoryDTO = {
        transactionId:this.uncatTransactionList()[this.transactionListIndex()].transactionId,
        categoryId:categoryId,
        uncatListIndex:this.transactionListIndex()
    }
    //How send index, it is a class feild, but i dont want to send it as an ouput event of its own
    //Make apart of DTO
    this.assignCategoryEvent.emit(setCategoryDTO);
    this.buttonNext();
  }

  getCurrentTransaction():Transaction{
    return this.uncatTransactionList()[this.transactionListIndex()];
  }
  

}
