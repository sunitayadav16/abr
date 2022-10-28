import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListRequestModel, UserListResponse, UpdateUserRoles, UpdateUserRoleResponse, Role } from '../../../../core/models';
import { ApiEndpoints } from '../../../../core/config/api-endpoints.config';
import { HttpService } from '../../../../core/services';

@Injectable()
export class RoleAssignmentService {

  public readonly userRoleEndpoints = ApiEndpoints.Common

  data: Role[] = [
    { "roleId":1, "roleName":"Admin"},{"roleId":3, "roleName":"GOT"},{"roleId":4,"roleName":"RSU"},
    {"roleId":7, "roleName":"CE"},{"roleId":5, "roleName":"PM"},{"roleId":6, "roleName":"BM"},{"roleId":10, "roleName":"RMD"},
    {"roleId":8, "roleName":"GEO lead"},{"roleId":9, "roleName":"PL"},
  ];

  constructor(
    private httpService: HttpService
  ) { }

  getUserList(data: ListRequestModel): Observable<UserListResponse> {
    return this.httpService.post<UserListResponse>(this.userRoleEndpoints.UserBulkRolesList, data);
  }

  updateUserRoles(data: UpdateUserRoles): Observable<UpdateUserRoleResponse> {
    return this.httpService.post<UpdateUserRoleResponse>(this.userRoleEndpoints.UpdateRole, data);
  }




}


