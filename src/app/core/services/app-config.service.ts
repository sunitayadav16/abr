import { AuthService } from '@core/services';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

import { HttpService } from './http.service';
import { RolePermission } from '@core/models';
import { ApiEndpoints } from '../config/api-endpoints.config';


@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    private rolePermissions: RolePermission[] = [];

    constructor(
        private httpService: HttpService
    ) { }

    loadAllRolePermissions() {
        return this.httpService.get<RolePermission[]>(ApiEndpoints.Common.RolePermissionsList).pipe(
            map(rolePermissions => this.rolePermissions = rolePermissions),
            catchError((x) => [])
        )
    }

    getAllRolesPermissions() {
        return this.rolePermissions;
    }

}