import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '@core/config/api-endpoints.config';
import {
  ListRequestModel,
  ProxyUserResponseModel,
  UserModel,
  ChangeUserStatus,
  UserResponseModel,
  UserListResponse,
  DeleteUser,
  ProxyUsersRequest,
  UpdateProxyUserModel,
  GridColumn
} from '@core/models';
import { HttpService } from '@core/services/http.service';

@Injectable()
export class UserService {

  public readonly userEndpoints = ApiEndpoints.User;
  public readonly userRoleEndpoints = ApiEndpoints.Common;
  // public readonly proxyUserEndPoints = ApiEndpoints.ProxyUser;

  constructor(
    private httpService: HttpService,
    public http: HttpClient
  ) { }


  getUserColumnHeaders(): GridColumn[] {
    return [
      {
        ColumnName: "employeeId",
        DisplayName: "WIN ID",
        AllowSorting: true,
      },
      {
        ColumnName: "name",
        DisplayName: "Employee name",
        AllowSorting: true,
      },
      {
        ColumnName: "primaryRole",
        DisplayName: "Primary role",
        AllowSorting: true,
      },
      {
        ColumnName: "email",
        DisplayName: "Employee email",
        AllowSorting: true,
      },
      {
        ColumnName: "",
        DisplayName: "Status",
        AllowSorting: false,
      },
      {
        ColumnName: "",
        DisplayName: "Select proxy",
        ClassName: "text-center",
        AllowSorting: false,
      },
      {
        ColumnName: "",
        DisplayName: "Action",
        ClassName: "text-center",
        AllowSorting: false,
      }
    ];
  }


  getUserList(data: ListRequestModel): Observable<UserListResponse> {
    return this.httpService.post<UserListResponse>(this.userEndpoints.UserList, data);
  }

  addUser(data: UserModel) {
    return this.httpService.post<UserResponseModel>(this.userEndpoints.AddUser, data)
  }

  editUser(data: UserModel) {
    return this.httpService.post<UserResponseModel>(this.userEndpoints.UpdateUser, data);
  }

  deleteUser(id: DeleteUser) {
    return this.httpService.post(this.userEndpoints.DeleteUser, id);
  }

  changeStatus(userStatus: ChangeUserStatus) {
    return this.httpService.post(this.userEndpoints.ChangeStatus, userStatus);
  }

  getUserRoleList(id: number) {
    const data: ListRequestModel = {
      id: id,
      pageNumber: 1,
      pageSize: 10
    }
    return this.httpService.post(this.userRoleEndpoints.UserRolesList, data)
  }

  // getProxyUsersList(data: ProxyUsersRequest): Observable<ProxyUserResponseModel> {
  //   return this.httpService.post<ProxyUserResponseModel>(this.proxyUserEndPoints.ProxyUsersList, data);
  // }

  // updateProxyUsers(data: UpdateProxyUserModel) {
  //   return this.httpService.post(this.proxyUserEndPoints.UpdateProxyUser, data);
  // }

}
