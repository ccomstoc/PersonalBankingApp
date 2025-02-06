import { inject, Injector } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

    
  if(!localStorage.getItem("user")){
      router.navigate(['/login']);
      return false;
  }

  return true;
};
