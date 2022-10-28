
export interface MakeAdjustmentResponse {
    adjustmentDetails : AdjustmentArrList[];
    adjustmentId : number;
    availableAdvanceBills? : number;
    availableGeneralCommissions? : number;
    availableVBISCommissions? : number;
    billTotal : number;
    clientId? : number;
    clientName? : string;
    currency? : string;
    deferralReason? : string;
    deferrals : number;
    deferralsTotal? : DeferralsTotal;
    proformaTotal? : proformaTotal;
    projectId? : number;
    projectName? : string;
    serviceId? : number;
    serviceName? : string;
    t2HoursValue? : T2HoursValue;
    taskId? : number;
    taskName? : string;
    totalCharges : string | number;
    proformaStatus?: string;
}

export interface AdjustmentsRequestModel {
    proformaId: number;
    projectId: number;
    serviceId: number;
    taskId: number;
}

export interface AdjustmentCaluclationModel {
    writeUpDownAmount : any;
    newAdvancedBill : any;
    advancedBillApplication : any;
    generalCommissionsApplication : any;
    vbisCommissionsApplication : any;
    volumeChargeTotal: any;
}


export interface DeferralsTotal {
    deferralsTotal: string;
}

export interface proformaTotal {
    proformaTotal: string;
    currency: string;
}

export interface T2HoursValue {
    t2HoursValue: string;
}

export interface AdjustmentArrList {
    adjustmentId: number;
    adjustmentValueId: number | null;
    advancedBillApplication: number | null;
    advancedBillCategory: number;
    advancedBillReason: string | null;
    comments: string | null;
    generalCommissionsApplication: number | null;
    newAdvancedBill: number | null;
    vbisCommissionsApplication: number | null;
    volumeChargeQuantity: number | null;
    volumeChargeRate: number | null;
    volumeChargeTotal: number | null;
    writeUpDownAmount: number | null;
    writeUpDownCategoryId: number;
    writeUpDownPercentage: number | null;
    writeUpDownReason: string | null;
}    

export interface SaveAdjustmentRequest {
    adjustmentId: number;
    projectId: number;
    serviceId: number;
    taskId: number;
    deferrals: number;
    deferralReason: string;
    billTotal: number;
    adjustmentsList: AdjustmentArrList[];
}