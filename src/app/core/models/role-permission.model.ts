
export interface Role {
    roleId: number;
    roleName: string;
    isPrimary?: boolean;
}

export interface Permission {
    permissionId: number;
    permissionName: string;
    permissionDisplayName: string;
}

export interface RolePermission {
    roleId: number;
    roleName: string;
    listRolePermissions: Permission[];
}

export interface UpdateUserRoles {
    userRoles: UserRoleDetails[];
}

export interface UserRoleDetails {
    userId: number;
    roleId: string
}

export interface UpdateUserRoleResponse {
    data: string;
    message: string;
}


export interface UpdateRolePermissions {
    userPermissions: RolePermissionDetails[];
}

export interface RolePermissionDetails{
    roleId: number;
    permissionId: string ;
}

export interface UpdateRolePermissionsResponse{
    data: string;
    message: string;
}

export interface RolePermissionRequestModel {
    roleId: number;
    permissionId: number[];
}
