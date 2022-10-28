import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';

import { LoginComponent, SetPasswordComponent, ForgetPasswordComponent, ChangePasswordModalComponent } from './components';

@NgModule({
  declarations: [
    LoginComponent,
    SetPasswordComponent,
    ForgetPasswordComponent,
    ChangePasswordModalComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    LayoutModule,
    SharedModule
  ]
})
export class AuthenticationModule { }