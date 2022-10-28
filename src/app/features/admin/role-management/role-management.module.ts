import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { RolePermissionGridComponent } from './components';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    RolePermissionGridComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RoleManagementRoutingModule
  ]
})
export class RoleManagementModule { }
