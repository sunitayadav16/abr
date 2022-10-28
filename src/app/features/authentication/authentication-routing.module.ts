import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLayoutComponent } from 'src/app/layout/layouts';
import { LoginComponent, SetPasswordComponent, ForgetPasswordComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationLayoutComponent,
    children: [{
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'set-password',
        component: SetPasswordComponent
      },
      {
        path : 'forgot-password',
        component : ForgetPasswordComponent
      },
      {
        path: '',
        redirectTo: 'login'
      }]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }