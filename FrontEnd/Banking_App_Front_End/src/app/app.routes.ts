import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: 'login',
    //pathMatch:'full', //required if using empty route
    loadComponent: () => {
        console.log("ran logig")
        return import('./components/login/login.component').then((m) => m.LoginComponent);
    }},
    {
    path:'transaction',
    loadComponent: () => {
            return import('./components/transaction-list/transaction-list.component').then((m) => m.TransactionListComponent);
        }
    }
];
