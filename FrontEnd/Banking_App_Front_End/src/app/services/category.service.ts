import { HttpBackend, HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Category } from '../models/Category.type';
import { environment } from '../Config/properties';
import { CreateCategoryDTO } from '../models/DTO/CreateCategoryDTO';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    http = inject(HttpClient);

    createCategory(catDTO:CreateCategoryDTO){
      console.log("Requesting new category")
      let url:string = environment.baseBackendUrl + "category";

      
      return this.http.post<Category>(url,catDTO);
    }
    deleteCategory(catId:number){
      let url:string = environment.baseBackendUrl +"category/" + catId;
      return this.http.delete<boolean>(url);
    }



    
}
