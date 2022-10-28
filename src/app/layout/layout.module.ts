import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';

import { MainFooterComponent } from './footers';
import { MainHeaderComponent, SwitchCurrentRoleComponent } from './headers';
import { MainLayoutComponent, AuthenticationLayoutComponent } from './layouts';

import { NavigationService } from './services';

@NgModule({
  declarations: [
    MainHeaderComponent,
    SwitchCurrentRoleComponent,
    MainFooterComponent,
    
    MainLayoutComponent, 
    AuthenticationLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    SharedModule
  ],
  exports:[
    MainLayoutComponent, 
    AuthenticationLayoutComponent
  ],
  providers: [
    NavigationService
  ]
})
export class LayoutModule { }
