export interface GlobalCodeResponse {
    globalCodesList: GlobalCode[];
    totalRows: number;
}

export interface GlobalCode {
    globalCodeId: number;
    globalCodeName: string;
    isActive: boolean;
    isDeleted: boolean;
}

export interface GlobalCodeRequest {
    id: number | string ;
}