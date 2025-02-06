import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginDTO } from '../../models/LoginDTO.type';
import { catchError } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //Dependencies
  authService = inject(AuthService);
  router = inject(Router)


  username:string = "";
  password:string = "";

  login(){
    let lDTO:LoginDTO = {
      userName: this.username,
      password: this.password
    }

    this.authService.login(lDTO).pipe(catchError((err) => {
      console.log(err);
      throw err;
    })).subscribe((user) => {
      if(user.status != 401 ){//If the responce is a success, set global user
        localStorage.setItem("user",JSON.stringify(user.body));
          this.router.navigate(['/home']);
      }
    })

  

    
  }
  createAccount(){

  }

}
