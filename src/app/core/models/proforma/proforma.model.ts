import { ProformaStatus } from "../../enums";

export interface ValidateProforma {
    date: string;
}

export interface ProformaBatchRequestModel {
    id: number,
    searchValue: string;
}

export interface ProformaBatchResponseModel {
    isDeleted: boolean;
    proformaBatchId: number;
    instructions : string;
    proformaBatchName: string;
    proformaStatusId: number;
    proformaStatusName: ProformaStatus;
}

export interface DeleteProformaBatch {
    id : number;
}

export interface ValidateProformaDetails {
    isExist: boolean;
}

export interface ChangeProformaStatus {
    id: number;
    status: ProformaStatus;
}

export interface ProformaData{
    file1 : string;
    file2 : string;
}

export interface CellEditRequest {
    id: number;
    entity: string;
    columnName: string;
    value: string;
}

export interface ProformaListResponse {
    clientRegion: string;
    clientMarket: string;
    proformaNo: string;
    proformaDescription: string;
    proformaDate: string;
    projectName: string;
    projectRegion: string;
    projectMarket: string;
    serviceName: string;
    taskName: string;
    chargeType: string;
    proformaTotal: number;
    currency: string;
    totalMoney: string;
    description: string;
    hourlyRate: number,
    totalCharges: string;
    time: number;
    value: string;
    availableAdvanceBills: number;
    availableGeneralCommissions: number;
    availableVBISCommissions: number;
}

export interface T2HoursListResponse {
    clientRegion: string;
    clientRegionMarket: string;
    clientOwner: string;
    projectManager: string;
    projectBillingManager: string;
    clientNickName: string;
    projectName: string;
    taskName: string;
    projectPractise: string;
    taskPractise: string;
    userId: string;
    userName: string;
    timeCategory: string;
    date: string;
    timeInHours: number;
    notes: string;
    hourlyRate: number;
    currency: string;
    internalId: string;
    approvalStatus: string;
    t2HoursValue: number;
}