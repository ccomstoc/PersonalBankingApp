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
    path:'home',
    canActivate:[authGuard],
    loadComponent: () => {
            return import('./components/home/home.component').then((m) => m.HomeComponent);
        }
    },{
        path: '', 
        redirectTo: '/home', 
        pathMatch: 'full' 
    },{
        path:'catagorize',
        canActivate:[authGuard],
        loadComponent: () => {
            return import('./components/catagorize/catagorize.component').then((m) => m.CatagorizeComponent);
        }
    }
    
];
