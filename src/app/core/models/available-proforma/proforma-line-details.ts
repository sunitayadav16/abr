export  interface ProformaLineRequestModel{
    proformaId: number;
    clientId: number;
    projectId: number;
    serviceId: number;
    taskId: number;
    pageNumber: number;
    pageSize: number;
    searchValue: string;
    sortColumn: string;
    sortOrder: string;
  
}


export interface ProformaLineResponseModel{
    proformaId: number;
    proformaNo: string;
    clientRegion: string;
    clientMarket: string;
    clientName: string;
    availableAdvanceBills: number;
    availableGeneralCommissions: number;
    availableVBISCommissions: number;
    projectName: number;
    projectRegion: string;
    projectMarket: string;
    serviceName: string;
    taskName: string;
    chargeType: string;
    proformaTotal: number;
    currency: string;
    totalMoney: string;
    description: string;
    hourlyRate: number;
    totalCharges: string;
    time: number;
    value: string;
    date: string

}