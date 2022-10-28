import { Component, OnInit, ViewChild } from '@angular/core';
import { Messages } from '@app/core/config';
import { GridColumn, Permission, RolePermission, RolePermissionRequestModel, UpdateRolePermissions } from '@core/models';
import { AppConfigService, EventService, LoaderService, ToasterService } from '@core/services';
import { CommonGridComponent } from '@shared/components';
import { RolePermissionService } from '../../services';

@Component({
  selector: 'app-role-permission-grid',
  templateUrl: './role-permission-grid.component.html',
  styleUrls: ['./role-permission-grid.component.scss']
})
export class RolePermissionGridComponent implements OnInit {
  @ViewChild(CommonGridComponent) commonGridComponent!: CommonGridComponent;

  allRolepermissions: Permission[] = [];
  allUserRoles: RolePermission[] = [];

  RolePermissionSelection: RolePermissionRequestModel[] = [];

  columnsList: GridColumn[] = [
    {
      ColumnName: "permissionName",
      DisplayName: "Employee Role",
      AllowSorting: false
    }
  ];

  checkExistingUserId: Number[] = [0];
  filteredPermissionList: any[] = [];
  checkHasAllPermission: number = 17;
  
  staticPermissionIdsArr = this.permissionService.createStaticPermissionIds();
  storeRepetedIds: number[] = [];

  public readonly Message = Messages.Error;
  
  constructor(
    private permissionService: RolePermissionService,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
    private appConfigService: AppConfigService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.getAllPermissions();
    this.getAllRolePermissions();
  }

  getAllPermissions() {
    this.permissionService.getPermission().subscribe((permissions: any) => {
      this.allRolepermissions = permissions;
      this.createColumnList(permissions);
    })
  }

  createColumnList(permissions: any) {
    permissions.forEach((permission: any) => {
      this.columnsList.push({
        ColumnName: permission.permissionDisplayName,
        DisplayName: permission.permissionDisplayName,
        AllowSorting: false
      })
    })
  }


  getAllRolePermissions() {
    this.loaderService.showSpinner();
    this.appConfigService.loadAllRolePermissions().subscribe((res: any) => {
      this.allUserRoles = res;
      this.filteredPermissionList = JSON.parse(JSON.stringify(this.allUserRoles));
      this.eventService.loadHeaderMenu.next(true);

      this.loaderService.hideSpinner()
      this.commonGridComponent.bindTable(res, 0);
    }, error => {
      this.loaderService.hideSpinner()
    });

  }


  checkRole(permissionId: number, rolePermission: Permission[], index: number ) {
    const allAccess = (rolePermission.findIndex(ur => ur.permissionId == 1) > -1) || (rolePermission.length > this.checkHasAllPermission);
    if(allAccess) {
      this.filteredPermissionList[index].listRolePermissions = this.allRolepermissions;
      this.filteredPermissionList[index].checkedAll = true;
    }

    return allAccess ? allAccess : rolePermission.findIndex(ur => ur.permissionId == permissionId) > -1 
  }

  toggleSelection(roleId: number, permissionId: number, rolePermission: Permission[], checkbox: any, index: number = 0){
    let previousSeletedRole: number[] = [];
    if (checkbox.checked == true){
      if(permissionId == 1) {
        this.checkExistingUserId.push(roleId);
        this.checkIfAllSelected(roleId, permissionId, index, true);
      }
      else if (this.checkExistingUserId.includes(roleId)){
        this.addPermissionInExistingArr(roleId, permissionId, index);
      } else {
        previousSeletedRole = this.getSelectedRoleArr(rolePermission);
        this.creatNewRolepermissionArr(roleId, permissionId, previousSeletedRole, true, index);
      }
    } else {
      const existId = this.checkExistingUserId.includes(roleId);
      if(this.RolePermissionSelection.length > 0 && existId) this.removePermissionArrIndex(roleId, permissionId, index);
      else{
        previousSeletedRole = this.getSelectedRoleArr(rolePermission);
        const prmissionIndex = previousSeletedRole.findIndex(id => id == permissionId);
        if (prmissionIndex > -1){
          if(permissionId == 1){
            previousSeletedRole = [];
            this.checkIfAllSelected(roleId, permissionId, index, false);
          }
          else if(previousSeletedRole.includes(1)){
            const ids = this.permissionService.createStaticPermissionIds();
            previousSeletedRole = ids.filter(i => i !== permissionId);
          }
          else previousSeletedRole.splice(prmissionIndex, 1);
        }
        this.filteredArr(index, permissionId);
        this.filteredPermissionList[index].checkedAll = false;

        const roleIndex = this.RolePermissionSelection.findIndex(id => id.roleId == roleId);
        if(roleIndex > -1){
          this.RolePermissionSelection[roleIndex].permissionId = previousSeletedRole;
        } else {
          this.RolePermissionSelection.push({
            roleId: roleId,
            permissionId: previousSeletedRole
          })
        }
        
      }
    }
  }


  checkIfAllSelected(roleId: number, permissionId: number, index: number, add: boolean){
    this.filteredPermissionList[index].listRolePermissions = add ? this.allRolepermissions : [];

    if(add){
      this.filteredPermissionList[index].checkedAll = true;
      const allAccessId = this.permissionService.convertInArr(permissionId);
      const roleIndex = this.RolePermissionSelection.findIndex(id => id.roleId == roleId);

      if(roleIndex > -1){
        this.RolePermissionSelection[roleIndex].permissionId = allAccessId;
      } else {
        this.RolePermissionSelection.push({
          roleId: roleId,
          permissionId: allAccessId
        })
      }

    }else {
      this.filteredPermissionList[index].checkedAll = false;
    }
    const permissionRoles = this.filteredPermissionList[index].listRolePermissions;
    this.storeRepetedIds = [];
    this.checkRole(permissionId, permissionRoles, index);
  }

  creatNewRolepermissionArr(roleId: number = 0, permissionId: number = 0, previousSeletedRole: number[] = [], checked: boolean = false, index:number = 0){
    this.checkExistingUserId.push(roleId);
    
    const roleIndex = this.RolePermissionSelection.findIndex(id => id.roleId == roleId);
    if(roleIndex > -1){
      this.RolePermissionSelection[roleIndex].permissionId = checked ? previousSeletedRole.concat(permissionId) : previousSeletedRole;
    } else {
      this.RolePermissionSelection.push({
        roleId: roleId,
        permissionId: checked ? previousSeletedRole.concat(permissionId) : previousSeletedRole
      })
    }

    this.checkAllCheckBoxesChecked(roleId, permissionId, index);
  }

  addPermissionInExistingArr(roleId: number, permissionId: number, index){
    const rolePermissionArrIndex = this.RolePermissionSelection.findIndex(id => id.roleId == roleId);
    if(rolePermissionArrIndex > -1) {
      let rolePermissionIdsArr = this.RolePermissionSelection[rolePermissionArrIndex].permissionId
      if(this.filteredPermissionList[index].checkedAll) rolePermissionIdsArr = this.staticPermissionIdsArr;

      rolePermissionIdsArr.push(permissionId)

      rolePermissionIdsArr = [...new Set(rolePermissionIdsArr)];
      this.RolePermissionSelection[rolePermissionArrIndex].permissionId = rolePermissionIdsArr;
    }
    this.checkAllCheckBoxesChecked(roleId, permissionId, index);

  }


  checkAllCheckBoxesChecked(roleId: number, permissionId: number, index: number) {
    const rolePermissionArrIndex = this.RolePermissionSelection.findIndex(id => id.roleId == roleId);
    if(rolePermissionArrIndex > -1){
      const rolePermissionIdsArr = this.RolePermissionSelection[rolePermissionArrIndex].permissionId;
      if(rolePermissionIdsArr.length > this.checkHasAllPermission) {
        this.filteredPermissionList[index].checkedAll = true;
        this.RolePermissionSelection[rolePermissionArrIndex].permissionId = [1];
        const filteredArrIndex = this.filteredPermissionList.findIndex(id => id.roleId == roleId);
        this.filteredPermissionList[filteredArrIndex].listRolePermissions = this.allRolepermissions;
      
        const permissionRoles = this.filteredPermissionList[filteredArrIndex].listRolePermissions;

        this.checkRole(permissionId, permissionRoles, index);
        this.storeRepetedIds = [];
      }
    }
  }

  removePermissionArrIndex(roleId: number, permissionId: number, index: number){
    const permissionRoleIndex = this.RolePermissionSelection.findIndex(id => id.roleId == roleId);
    if(permissionRoleIndex > -1) {
      const rolePermissionsArr = this.RolePermissionSelection[permissionRoleIndex];

      this.storeRepetedIds.push(roleId); 
      const duplicatesIdsArr = this.permissionService.getDuplicateValue(this.storeRepetedIds);
      const isDuplicateId = duplicatesIdsArr.includes(roleId.toString());

      if(this.filteredPermissionList[index].checkedAll && !isDuplicateId) {
        rolePermissionsArr.permissionId = [...this.staticPermissionIdsArr];
      }
      this.filteredArr(index, permissionId);

      const permissionIndex = rolePermissionsArr.permissionId.findIndex((id: Number) => id == permissionId);
      rolePermissionsArr.permissionId.splice(permissionIndex, 1);
      this.filteredPermissionList[index].checkedAll = false;

      if(permissionId == 1 ){
        rolePermissionsArr.permissionId = [];
        this.checkIfAllSelected(roleId, permissionId, index, false);
      }
    }
  }

  getSelectedRoleArr(permissions: Permission[]) {
    permissions = permissions.filter(id => id.permissionId !== 0);
    return permissions.map(ur => ur.permissionId);
  }


  filteredArr(index, permissionId){
    const removePermissionIds = [1, permissionId];
    this.filteredPermissionList[index].listRolePermissions = this.filteredPermissionList[index].listRolePermissions.filter(id => removePermissionIds.indexOf(id.permissionId) === -1);
    return this.filteredPermissionList;
  }

  savePermissions() {
    if (this.RolePermissionSelection.length == 0) {
      this.toasterService.error(this.Message.NoChangesFoundError);
      return;
    }
    let params: UpdateRolePermissions = {
      userPermissions: this.dataMapping()
    }
    this.permissionService.updateRolePermissions(params).subscribe(res => {
      this.getAllRolePermissions();
      this.RolePermissionSelection = [];
      this.checkExistingUserId = [];
    })
  }


  dataMapping() {
    const rolePermissionArr = this.RolePermissionSelection.map((data: any) => {
      data.arr = {
        roleId: data.roleId,
        permissionId: data.permissionId.join()
      }
      return data.arr;
    })
    return rolePermissionArr;
  }

  searchData(searchValue: any) {
    searchValue = searchValue.trim();
    const roles = JSON.parse(JSON.stringify(this.allUserRoles));

    if (!searchValue) {
      this.filteredPermissionList = roles;
      return;
    }

    const searchedlist = roles.filter((role: any) => {
      const roleName = role.roleName.toLowerCase();
      return roleName.includes(searchValue.toLocaleLowerCase());
    });
    this.filteredPermissionList = [...searchedlist];
  }


}