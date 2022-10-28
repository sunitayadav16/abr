export interface ProfileModel{
  employeeId?: number | null;
  name?:string;
  email?:string;
  roleId?: number,
  userId? : number | undefined;
}

export interface UserRole {
  roleId: number;
  roleName?: string;
  isPrimary: boolean;
}

export interface ProfileDetailsResponseModel{
  userId?: number;
  name?: string;
  email?: string;
  employeeId?: number | null;
  roles?: UserRole[]
}
