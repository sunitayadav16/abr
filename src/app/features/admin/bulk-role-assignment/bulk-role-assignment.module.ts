import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';

import { BulkRoleAssignmentRoutingModule } from './bulk-role-assignment-routing.module';

import { RoleAssignmentGridComponent } from './components';

import { RoleAssignmentService } from './services';


@NgModule({
  declarations: [
    RoleAssignmentGridComponent
  ],
  imports: [
    CommonModule,
    BulkRoleAssignmentRoutingModule,
    SharedModule
  ],
  providers: [
    RoleAssignmentService
  ]
})
export class BulkRoleAssignmentModule { }
