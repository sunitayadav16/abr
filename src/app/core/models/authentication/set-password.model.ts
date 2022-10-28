export interface SetPasswordRequest {
    userId?: number;
    password?: string;
    confirmPassword?: string;
}

export interface ValidateTokenResponse {
    email: string; 
    name: string;
    userId: number; 
    userName: string; 
}

export interface ChangePasswordRequest {
    userId?: number;
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}