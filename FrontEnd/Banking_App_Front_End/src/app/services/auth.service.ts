import { inject, Injectable, signal } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginDTO } from '../models/LoginDTO.type';
import { Observable } from 'rxjs';
import { User } from '../models/User.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser = signal<(User | null)>(null);

  http = inject(HttpClient);

  login(lDTO:LoginDTO):Observable<HttpResponse<User>>{
    let url:string = "http://localhost:8080/login";
    return this.http.post<User>(url,lDTO,{ observe: 'response' });

  }
  

    

  
}
