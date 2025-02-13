import { Component, effect, Input, OnChanges, OnInit, signal, Signal, SimpleChanges } from '@angular/core';
import { User } from '../../../models/User.type';
import { Category } from '../../../models/Category.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sort-card',
  imports: [CommonModule],
  templateUrl: './sort-card.component.html',
  styleUrl: './sort-card.component.css'
})
export class SortCardComponent implements OnChanges, OnInit{

  @Input() currentUser!: Signal<User>;

  categoryButtonsSignal = signal<Array<Array<Category>>>([[]]);

  ngOnInit(): void {
    this.updateCategoryButtons()
  }

  constructor(){
    effect(() =>{//runs when signals are changed, so updates list when currentUserChanges
      console.log("effect run")
      this.updateCategoryButtons();
    })
  }
  //set signal = updateCatButons

  //categoryButtons:<Array<Array<Category>>> = [[]]

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Change Detected")
    this.updateCategoryButtons()
      
  }

  //Translates the categories into 2d array for easy template rendering
  updateCategoryButtons(){

    let categoryButtons:Array<Array<Category>> = [[]];

    let categoryRowIndex = 0;
    for(let i = 0; i<this.currentUser().userCategories.length; i++){
      console.log(i);
      if(i%4 == 0 && i != 0){
          categoryRowIndex++;
          categoryButtons.push([]);
      }
      categoryButtons[categoryRowIndex].push(this.currentUser().userCategories[i]);
      console.log(this.currentUser().userCategories[i]);
    }
    this.categoryButtonsSignal.set(categoryButtons);


  }

}
