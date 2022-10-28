import { UserRole } from '@core/models';

export interface LoginRequest {
    email?: string;
    password?: string;
}

export interface UserDetails {
    userId: number;
    firstName: string; 
    lastName: string;
    email: string;
    roles: UserRole[];
}

export interface LoginResponse extends UserDetails {
    token: string;
    refreshToken: string;
}
