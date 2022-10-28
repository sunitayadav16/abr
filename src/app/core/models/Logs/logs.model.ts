export interface LogRequestModel {
    id : number;
    searchValue: string;
    pageNumber ?: number;
    pageSize ?: number;
    sortColumn ?: string;
    sortOrder? : string;
}

export interface UserLogResponseModel {
    userId: number;
    employeeId: string;
    name: string;
    email: string;
    createdBy: string;
    modifiedBy: string;
    createdOn: Date;
    modifiedOn: Date; 
}

export interface ProformaBatchLogResponseModel{
    proformaBatchId:number;
    proformaBatchName: string;
    proformaStatus: string;
    createdBy: string;
    createdOn: Date;
    modifiedBy: string;
    modifiedOn: Date;
}

export interface UserRolesLogModel{
    userRoleId: number;
    userId: number;
    userName: string;
    roleId: number;
    roleName: string;
    isPrimary: true;
    createdBy: string;
    createdOn: Date;
    modifiedOn: Date    
}

export interface ProxyUserLogsModel{
    proxyUserAuditId: number;
    employeeId: string;
    userId: number;
    userName: string;
    proxyUserId: number;
    proxyUserName: string;
    createdBy: string;
    createdOn: Date;
    modifiedOn: Date 
}

export interface ProformaInlineLogsModal {
    clientId: number;
    clientRegion: string;
    clientMarket: string;
    clientName: string;
    proformaId: number;
    proformaNo: string;
    clientOwner: string;
    geoLead: string;
    rmd: string;
    rsu: string;
    projectManager: string;
    billingManager: string;
    projectId: number;
    projectName: string;
    projectRegion: string;
    projectMarket: string;
    serviceId: number;
    serviceName: string;
    taskId: number;
    taskName: string;
    proformaChargeId: number;
    chargeType: string;
    proformaTotal: number;
    currency: string;
    totalMoney: string;
    description: string;
    hourlyRate: number;
    totalCharges: string;
    time: number;
    userName: string;
    value: string;
    date: Date
} 


export interface UnsentEmailResponseModal{
    emailNotificationId:number;
    emailRecipient: string;
    emailTemplate: string;
    userId:number;
    userName: string;
    isSent: boolean;
    sentBy: string;
    sentOn: Date;  
}

export interface ProformaInvoicesLogsData{
    proformaId: number,
    proformaNo: string,
    clientOwner: string,
    geoLead: string,
    rmd: string,
    rsu: string,
    proformaStatus: string,
    openAirStatus: string,
    internalNotes: string,
    proformaNotes: string,
    collectionsContact: string,
    proformaLayout: string,
    modifiedBy: string,
    modifiedOn: Date
}

export interface logsResponseModel {
    id: number;
    name: string;
}

export interface UserLogsModifiedDataModel {
    actionPerformedDate: string;
    actionPerformedBy: string;
    actionPerformed: string;
    name: string;
    email: string;
    isActive: string;
}

export interface ProformaBatchLogsModifiedDataModel {
    actionPerformedDate: string;
    actionPerformedBy: string;
    actionPerformed: string;
    proformaBatchName: string;
    instructions: string;
    proformaStatus: string;
    showMore?: boolean;
}
