import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account/account.component';
import { AccountsComponent } from './account/accounts/accounts.component';
import { AccountAddEditComponent } from './account/account-add-edit/account-add-edit.component';



const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'accounts',component:AccountsComponent,canActivate:[AuthGuard]},
  { path: 'account/edit/:id', component: AccountAddEditComponent },
  {path:'account/:id',component:AccountComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
