import { Routes } from '@angular/router';
import { authGuard } from './gaurds/auth.guard';

export const routes: Routes = [{
    path: 'login',
    //pathMatch:'full', //required if using empty route
    loadComponent: () => {
        console.log("ran logig")
        return import('./components/login/login.component').then((m) => m.LoginComponent);
    }},
    {
    path:'transaction',
    canActivate:[authGuard],
    loadComponent: () => {
            return import('./components/transaction-list/transaction-list.component').then((m) => m.TransactionListComponent);
        }
    }
];
