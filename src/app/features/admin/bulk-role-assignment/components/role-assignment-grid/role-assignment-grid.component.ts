import { Component, OnInit, ViewChild } from '@angular/core';
import { GridColumn, ListRequestModel, Role, UpdateUserRoles, UserRole } from '../../../../../core/models';

import { CommonGridComponent } from '@shared/components';

import { AuthService, LoaderService, ToasterService } from '@core/services';
import { RoleAssignmentService } from '../../services';
import { Messages } from '@app/core/config';

@Component({
  selector: 'app-role-assignment-grid',
  templateUrl: './role-assignment-grid.component.html',
  styleUrls: ['./role-assignment-grid.component.scss']
})
export class RoleAssignmentGridComponent implements OnInit {
  @ViewChild(CommonGridComponent) commonGridComponent!: CommonGridComponent;
  
  allUserRoles: Role[] = [];
  usersList: any[] = [];

  userRolesSelection: any[] = [];

  columnsList: GridColumn[] = [
    {
      ColumnName: "userName",
      DisplayName: "Employee name",
      AllowSorting: false
    },
    {
      ColumnName: "employeeId",
      DisplayName: "WIN ID ",
      AllowSorting: false
    },
    // {
    //   ColumnName: "employeeId",
    //   DisplayName: "WIN ID ",
    //   AllowSorting: false
    // }
  ];

  checkExistingUserId: Number[] = [];
  message: string = '';
  checkRoleSelection: boolean = false;

  public readonly Message = Messages.Error;

  constructor(
    private authService: AuthService,
    private roleService: RoleAssignmentService,
    private loaderService: LoaderService,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    
    this.allUserRoles = this.roleService.data;
    this.createColumnList();
  }

  createColumnList() {
    
    this.allUserRoles.forEach(role => {
      this.columnsList.push({
        ColumnName: role.roleName,
        DisplayName: role.roleName,
        AllowSorting: false
      })
    })
  }


  filterGrid(request: ListRequestModel) {
    this.loaderService.showSpinner();
    this.roleService.getUserList(request).subscribe(res => {
      this.usersList = res.usersList;
      this.commonGridComponent.bindTable(res.usersList, res.totalRows);

      this.loaderService.hideSpinner();
    }, error => {
      this.loaderService.hideSpinner();
    })
  }

  chekRole(userId: number, roleId: number, userRoles: UserRole[]) {
    const selection = this.userRolesSelection.find(ur => ur.userId == userId);

    const userRolesIds = selection ? selection.roleId : userRoles.map(ur => ur.roleId);
    return userRolesIds.includes(roleId);

  }

  toggleUserRoles(user: any, roleId: number, checkbox: any) {
    let previousSeletedRole: number[] = [];
    const { userId, roleNameList, name } = user;
    if (checkbox.checked == true) {
      if (this.checkExistingUserId.includes(userId)) {
        this.removeUncheckedRole(userId, roleId);
      } else {
        previousSeletedRole = this.selectedRole(roleNameList);
        this.createRolepermissionArr(userId, roleId, name, previousSeletedRole, true);
      }
    } else {
      if (this.checkExistingUserId.includes(userId)) {
        this.removeUncheckedRole(userId, roleId);
      } else {
        previousSeletedRole = this.selectedRole(roleNameList);
        const index = previousSeletedRole.findIndex(id => id == roleId);
        if (index > -1) previousSeletedRole.splice(index, 1);
        this.createRolepermissionArr(userId, roleId, name, previousSeletedRole, false);
      }
    }
  }

  createRolepermissionArr(userId: number = 0, roleId: number = 0, name:string = '', previousSeletedRole: number[] = [], checked: boolean = false){
    this.checkExistingUserId.push(userId);
    this.userRolesSelection.push({
      userId: userId,
      userName: name,
      roleId: checked ? previousSeletedRole.concat(roleId) : previousSeletedRole
    })
  }

  removeUncheckedRole(userId: number, roleId: number) {
    const userRoleIndex = this.userRolesSelection.findIndex(u_id => u_id.userId == userId);
    if (userRoleIndex > -1) {
      const roleIndex = this.userRolesSelection[userRoleIndex].roleId.findIndex((id: Number) => id == roleId);
      if (roleIndex > -1) {
        this.userRolesSelection[userRoleIndex].roleId.splice(roleIndex, 1);
      } else {
        this.userRolesSelection[userRoleIndex].roleId.push(roleId);
      }
    }
    return this.userRolesSelection;
  }

  selectedRole(roles: UserRole[]) {
    return roles.map(ur => ur.roleId);
  }

  saveRole() {;
    if (this.userRolesSelection.length == 0) {
      return this.toasterService.error(this.Message.NoChangesFoundError);
    }

    for (let i = 0; i < this.userRolesSelection.length; i++) {
      if (this.userRolesSelection[i].roleId.length == 0) {
        this.message = this.Message.RolesStaticError + '' + this.userRolesSelection[i].userName
        // this.message = 'Please select at least one role for' + ' ' + this.userRolesSelection[i].userName;
        this.checkRoleSelection = true;
        break;
      }
    }

    if (this.checkRoleSelection) {
      this.checkRoleSelection = false;
      return this.toasterService.error(this.message);
    }


    let params: UpdateUserRoles = {
      userRoles: this.dataMapping()
    }
    this.roleService.updateUserRoles(params).subscribe(res => {
      this.commonGridComponent.filterTable();
      this.userRolesSelection = [];
      this.checkExistingUserId = [];
    })
  }

  dataMapping() {
    const userRoleArr = this.userRolesSelection.map(data => {
      data.arr = {
        userId: data.userId,
        roleId: data.roleId.join()
      }
      return data.arr;
    })
    return userRoleArr;
  }

}
