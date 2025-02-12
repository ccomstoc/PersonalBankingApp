import { ChangeDetectorRef, Component, inject, NgZone, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginDTO } from '../../models/LoginDTO.type';
import { catchError, Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{
  //Dependencies
  authService = inject(AuthService);
  router = inject(Router)
  private destroy$ = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);


  username:string = "";
  password:string = "";

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  login(){
    let lDTO:LoginDTO = {
      userName: this.username,
      password: this.password
    }

    this.authService.login(lDTO).pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
      console.log(err);
      throw err;
    })).subscribe((user) => {
      if(user.status != 401 ){//If the responce is a success, set global user
        console.log('Before updating localStorage:', NgZone.isInAngularZone());
        
        localStorage.setItem("user",JSON.stringify(user.body));

        //localStorage.setItem("user","test");
        this.ngZone.run(() => {
          console.log('Inside NgZone:', NgZone.isInAngularZone());
          this.router.navigate(['/catagorize']);
        });

        //this.router.navigate(['/catagorize']);
      }
    })

  

    
  }
  createAccount(){

  }

}
