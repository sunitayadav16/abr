export interface UserListModel {
    userId: number;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    primaryRole: string;
    isActive: boolean;
    createdBy: number;
    createdOn: Date;
}

export interface UserModel {
    userId?: number;
    name?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    userRoles?: number[];
    isActive?: boolean;
}


export interface UserRole {
    roleId: number;
    roleName?: string;
    isPrimary: boolean;
}

export interface ChangeUserStatus {
    id: number;
    isActive: boolean;
}

export interface UserListResponse {
    usersList: [];
    totalRows: number;
}

export interface UserResponseModel {
    data: [];
    message: string;
}

export interface DeleteUser {
    id: number;
}

export interface UserRoleRequest{
    id: number,
    pageNumber: number,
    pageSize: number
}


