import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login-component/login-component';
import { RegisterComponent } from './pages/register-component/register-component';
import { DashboardComponent } from './pages/dashboard-component/dashboard-component';
import { ViewKudos } from './pages/view-kudos/view-kudos';
import { authGuard } from './guards/auth-guard';
import { lockGuard } from './guards/lock-guard';

export const routes: Routes = [

    { path: 'login', component: LoginComponent, canActivate: [lockGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [lockGuard]},
    { path: 'dashboard', component: DashboardComponent,  canActivate: [authGuard]},
    { path: 'view-kudos', component: ViewKudos,  canActivate: [authGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full'},

];
