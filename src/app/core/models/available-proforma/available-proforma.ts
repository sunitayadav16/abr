export interface AvailableProformaRequestList{
    id: number;
    pageNumber: number ;
    pageSize: number ;
    searchValue?: string;
    sortColumn? : string ;
    sortOrder?: string ; 
}

export interface AvailableProformaResponseModel{
   proformaId: number;
       clientRegion:string;
       clientMarket:string;
       clientName:string;
       proformaNo:string;
       proformaDescription:string;
       proformaDate:Date;
       projects: ProjectList[];
       projectRegion: string;
       projectMarket:string;
       serviceName:string;
       taskName: string;
       chargeType:string;
       proformaTotal: number;
       currency: string;
       totalMoney: string;
       description: string;
       hourlyRate: number;
       totalCharges: number;
       time: number;
       value: string;
       availableAdvanceBills: number;
       availableGeneralCommissions: number,
       availableVBISCommissions: number
}

export interface ProjectList{
    projectName : string;
 }