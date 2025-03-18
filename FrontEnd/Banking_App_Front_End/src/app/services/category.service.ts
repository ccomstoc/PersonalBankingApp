import { HttpBackend, HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Category } from '../models/Category.type';
import { environment } from '../Config/properties';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    http = inject(HttpClient);

    createCategory(catName:String, userId:number){
      console.log("Requesting new category")
      let url:string = environment.baseBackendUrl + "category";
      let category = {
          "name":catName,
          "userId": userId
      }
      
      return this.http.post<Category>(url,category);
    }
    deleteCategory(catId:number){
      let url:string = environment.baseBackendUrl +"category/" + catId;
      return this.http.delete<boolean>(url);
    }



    
}
