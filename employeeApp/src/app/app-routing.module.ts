import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { PageerrorComponent } from './pageerror/pageerror.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { PractiseComponent } from './practise/practise.component';


const routes: Routes = [
  {path: '', component: EmployeeComponent, canActivate: [AuthGuard]},
  {path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard]},
  {path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
  {path: 'welcome/:id', component: WelcomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'practise', component: PractiseComponent},
  {
    path: 'welcome',
    canActivate: [AuthGuard],
    children: [
      {  path: '', redirectTo: 'login', pathMatch: 'full'  },
      {  path: 'login', component: LoginComponent  },
      
    ]
  },
  {path: '**', component: PageerrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


