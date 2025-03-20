import { Component, effect, Input, OnInit, signal, Signal } from '@angular/core';
import { CategoryWithStats } from '../../../models/CategoryWithStats.type';

@Component({
  selector: 'app-category-cards',
  imports: [],
  templateUrl: './category-cards.component.html',
  styleUrl: './category-cards.component.css'
})
export class CategoryCardsComponent implements OnInit{

  @Input() categoryArray!:Signal<Array<CategoryWithStats>>

  categoryGrid = signal<Array<Array<CategoryWithStats>>>([]);

  constructor(){
      effect(() => {
        console.log("Hi")
        console.log(this.categoryArray())
        this.createCategoryGrid(this.categoryArray());
      })
  }

  ngOnInit(): void {
    //this.createCategoryGrid();
  }

  
    createCategoryGrid( localCatArray:Array<CategoryWithStats> ):Array<Array<CategoryWithStats>>{
      //console.log(localCatArray.length)
      //localCatArray = Array.from(localCatArray);
      console.log("inside")
      console.log(localCatArray);
      console.log("Is it an array?", Array.isArray(localCatArray));
console.log("Instance type:", localCatArray.constructor.name);
      
      console.log("length" + localCatArray.length)
      let outterArray:Array<Array<CategoryWithStats>> = []
      for(let i = 0; i < localCatArray.length; i++){
        console.log("in loop")
        if(i % 4 == 0){
          outterArray.push([]);
        outterArray[outterArray.length-1][i%4] = localCatArray[i];
        }
      }
      console.log("in cards")
      console.log(outterArray);
      this.categoryGrid.set(outterArray);
      return outterArray;
    }

}
