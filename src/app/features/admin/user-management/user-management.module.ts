import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './services/user.service';
import { SharedModule } from '@shared/shared.module';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserListingComponent, UserDetailsComponent, MimicUserComponent } from './components';
import { ModalService } from '@shared/services';


@NgModule({
  declarations: [
    UserListingComponent,
    UserDetailsComponent,
    MimicUserComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule
  ], 
  exports: [
    
  ],
  entryComponents: [
    UserDetailsComponent
  ],
  providers: [
    UserService,
    ModalService
  ]
  
})
export class UserManagementModule { }
