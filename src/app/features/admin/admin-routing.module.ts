import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './../../layout/layouts';
import { Permission } from '@core/enums';
import { RolePermissionGuard } from '@core/guards';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'user-management',
        loadChildren: () => import(`./user-management/user-management.module`).then(m => m.UserManagementModule),
        canActivate: [RolePermissionGuard],
        data: {
          requiredPermission: Permission.UserManagement
        }
      },
      {
        path: 'bulk-role-assignment',
        loadChildren: () => import(`./bulk-role-assignment/bulk-role-assignment.module`).then(m => m.BulkRoleAssignmentModule),
        canActivate: [RolePermissionGuard],
        data: {
          requiredPermission: Permission.UserManagement
        }
      },
      {
        path: 'role-management',
        loadChildren: () => import(`./role-management/role-management.module`).then(m => m.RoleManagementModule),
        canActivate: [RolePermissionGuard],
        data: {
          requiredPermission: Permission.RoleManagement
        }
      },
      {
        path: 'proforma-management',
        loadChildren: () => import(`./proformas-management/proforma-management.module`).then(m => m.proformaManagementModule),
        canActivate: [RolePermissionGuard],
        data: {
          requiredPermission: Permission.ProformaManagement
        }
      },
      {
        path: 'logs-management',
        loadChildren: () => import(`./logs-management/logs-management.module`).then(m => m.LogsManagementModule),
        // canActivate: [RolePermissionGuard],
        // data: {
        //   requiredPermission: Permission.ProformaManagement
        // }
      },
      {
        path: 'other-list-management',
        loadChildren: () => import(`./other-list-management/other-list-management.module`).then(m => m.OtherListManagementModule),
        canActivate: [RolePermissionGuard],
        data: {
          requiredPermission: Permission.OtherListsManagement
        }
      },
      {
        path: '',
        redirectTo: 'user-management'
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }