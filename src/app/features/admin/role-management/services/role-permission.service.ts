import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../../../core/config/api-endpoints.config';
import { UpdateRolePermissions, UpdateRolePermissionsResponse, Permission } from '../../../../core/models';
import { HttpService } from '../../../../core/services';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {

  public readonly userRoleEndpoints = ApiEndpoints.Common

  constructor(
    private httpService: HttpService,
  ) { }

  getPermission(): Observable<Permission[]>{
    return this.httpService.get<Permission[]>(this.userRoleEndpoints.GetPermissions);
  }

  updateRolePermissions(data: UpdateRolePermissions): Observable<UpdateRolePermissionsResponse>{
    return this.httpService.post<UpdateRolePermissionsResponse>(this.userRoleEndpoints.UpdatePermission, data);
  }

  createStaticPermissionIds(){
    const staticArr = Array.from({length: 19}, (_, i) => i + 2);
    staticArr.splice(12, 1);
    return staticArr;
  }

  convertInArr(id: number){
    return Array.from(String(id), num => Number(num));
  }

  getDuplicateValue(storeRepetedIds: number[]) {
    const uniq = storeRepetedIds.map((name) => {
      return {
        count: 1,
        name: name
      }
    }).reduce((a, b) => {
      a[b.name] = (a[b.name] || 0) + b.count
      return a
    }, {})

    return Object.keys(uniq).filter((a) => uniq[a] > 1)
  }
}


