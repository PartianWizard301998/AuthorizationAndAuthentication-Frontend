import { Routes } from '@angular/router';

export const routes: Routes = [
    
    {path:'login', loadComponent: ()=> import('./Pages/login/login.component')},
    {path:'register', loadComponent: ()=> import('./Pages/register/register.component')},
    {path:'home', loadComponent: ()=> import('./Pages/home/home.component')},
    {path:'forgetPassword', loadComponent: ()=> import('./Pages/forget-password/forget-password.component')},
    {path:'reset/:token', loadComponent: ()=> import('./Pages/reset-pass/reset-pass.component')}
];
