import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '@app/core/config';
import { GridColumn, 
        ListRequestModel, 
        ProformaBatchResponseModel, 
        LogRequestModel, 
        ProformaInlineLogsModal, 
        ProformaInvoicesLogsData, 
        ProxyUserLogsModel, 
        UnsentEmailResponseModal, 
        UserLogResponseModel, 
        UserRolesLogModel, 
        logsResponseModel } from '@app/core/models';
import { HttpService, UtilityService } from '@app/core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogManagementService {
  public readonly userLogEndpoints = ApiEndpoints.Logs;
  public readonly proformaBatchPoints = ApiEndpoints.Proforma;
  
  constructor(  
    private httpService: HttpService,
    public http: HttpClient,
    private utilityService: UtilityService) { }
    
  userLogsColumnsList: GridColumn[] = [
    {
      ColumnName: "actionPerformedDate",
      DisplayName: "Action performed date",
      AllowSorting: false,
      FormatValue: (value: any, data: any) => {
        return this.utilityService.formatDateWithTime(value, data);
      }
    },
    {
      ColumnName: "actionPerformedBy",
      DisplayName: "Action performed by",
      AllowSorting: false,
    },
    {
      ColumnName: "actionPerformed",
      DisplayName: "Action performed",
      AllowSorting: false
    },
    {
      ColumnName: "name",
      DisplayName: "Name",
      AllowSorting: true,
    },
    {
      ColumnName: "email",
      DisplayName: "Email",
      AllowSorting: true,
    },
    {
     ColumnName: "isActive",
     DisplayName: "Status",
     AllowSorting: false,
    }
  ]

  proformaBatchLogsColumnsList: GridColumn[] = [
    {
      ColumnName: "actionPerformedDate",
      DisplayName: "Action performed date",
      AllowSorting: false,
      FormatValue: (value: any, data: any) => {
        return this.utilityService.formatDateWithTime(value, data);
      }
    },
    {
      ColumnName: "actionPerformedBy",
      DisplayName: "Action performed by",
      AllowSorting: false,
    },
    {
      ColumnName: "actionPerformed",
      DisplayName: "Action performed",
      AllowSorting: false
    },
    {
      ColumnName: "proformaBatchName",
      DisplayName: "Proforma batch name",
      AllowSorting: true,
    },
    {
      ColumnName: "proformaStatus",
      DisplayName: "Proforma status",
      AllowSorting: true,
    },
    {
      ColumnName : '',
      DisplayName : 'Instructions',
      AllowSorting : false,
    }
  ]

  userRolesLogColumnsList : GridColumn[] =[
    {
      ColumnName: "modifiedOn",
      DisplayName: "Action performed date",
      AllowSorting: true,
      FormatValue: (value: any, data: any) => {
        return this.utilityService.formatDateWithTime(value, data);
      }
    },
    {
      ColumnName: "modifiedBy",
      DisplayName: "Action performed by",
      AllowSorting: true,
    }, 
    {
      ColumnName: "action",
      DisplayName: "Action performed",
      AllowSorting: true,
    },
    {
      ColumnName: "userName",
      DisplayName: "User name",
      AllowSorting: true,
    },
    {
      ColumnName: "roleName",
      DisplayName: "Role name",
      AllowSorting: true,
      
    },
  ]

  ProformaInlineLogsColumnsList : GridColumn[] = [
    // {
    //   ColumnName: "clientRegion",
    //   DisplayName: "Region (client)",
    //   AllowSorting: true,
    // },
    // {
    //   ColumnName: "clientMarket",
    //   DisplayName: "Market (client)",
    //   AllowSorting: true,
    // },
    // {
    //   ColumnName: "clientName",
    //   DisplayName: "Client name",
    //   AllowSorting: true,
    // },
    // {
    //   ColumnName: "proformaNo",
    //   DisplayName: "Proforma #",
    //   AllowSorting: true,
      
    // },
    // {
    //   ColumnName: "clientOwner",
    //   DisplayName: "Client owner",
    //   AllowSorting: true,
    // },
    // {
    //   ColumnName: "geoLead",
    //   DisplayName: "Geo lead",
    //   AllowSorting: true,
    // },
    // {
    //   ColumnName: "rmd",
    //   DisplayName: "RMD",
    //   AllowSorting: true,
    // },
    // {
    //   ColumnName: "rsu",
    //   DisplayName: "RSU",
    //   AllowSorting: true,
    // },
    {
      ColumnName: "projectManager",
      DisplayName: "Project manager",
      AllowSorting: true,
    },
    {
      ColumnName: "billingManager",
      DisplayName: "Billing manager",
      AllowSorting: true,
    },
    {
      ColumnName: "projectName",
      DisplayName: "Project name",
      AllowSorting: true,
    },
    {
      ColumnName: "projectRegion",
      DisplayName: "Region (project)",
      AllowSorting: true,
    },
    {
      ColumnName: "projectMarket",
      DisplayName: "Market (project)",
      AllowSorting: true,
    },
    {
      ColumnName: "serviceName",
      DisplayName: "Service name",
      AllowSorting: true,
    },
    {
      ColumnName: "currency",
      DisplayName: "Currency",
      AllowSorting: true,
    },
    {
      ColumnName: "proformaTotal",
      DisplayName: "Proforma total",
      AllowSorting: true,
    },
    {
      ColumnName: "taskName",
      DisplayName: "Task name",
      AllowSorting: true,
    },
    {
      ColumnName: "chargeType",
      DisplayName: "Charge type",
      AllowSorting: true,
    },
    {
      ColumnName: "proformaTotal",
      DisplayName: "Total money",
      AllowSorting: true,
      FormatValue: (value: any, data: any) => this.utilityService.formatAmount(value, data)
    },
    {
      ColumnName: "description",
      DisplayName: "Description",
      AllowSorting: true,
    },
    {
      ColumnName: "hourlyRate",
      DisplayName: "Hourly rate",
      AllowSorting: true,
    },
    {
      ColumnName: "proformaTotal",
      DisplayName: "Total charges",
      AllowSorting: true,
      FormatValue: (value: any, data: any) => this.utilityService.formatAmount(value, data)
    },
    {
      ColumnName: "time",
      DisplayName: "Time",
      AllowSorting: true,
    },
    {
      ColumnName: "userName",
      DisplayName: "User name",
      AllowSorting: true,
    },
    {
      ColumnName: "value",
      DisplayName: "Value",
      AllowSorting: true,
      
    },
    {
      ColumnName: "date",
      DisplayName: "Date",
      AllowSorting: true,
      FormatValue: (value: any, data: any) => {
        return this.utilityService.formatDateWithTime(value, data);
      }
    },
  ]

  ProxyUserLogColumnList : GridColumn[] = [
    // {
    //   ColumnName: "createdOn",
    //   DisplayName: "Created date",
    //   AllowSorting: true,
    //   FormatValue: (value: any, data: any) => {
    //     return this.utilityService.formatDateWithTime(value, data);
    //   }
    // },
    // {
    //   ColumnName: "createdBy",
    //   DisplayName: "Created by",
    //   AllowSorting: true,
    // },
    {
      ColumnName: "modifiedOn",
      DisplayName: "Modified date",
      AllowSorting: true,
      FormatValue: (value: any, data: any) => {
        return this.utilityService.formatDateWithTime(value, data);
      }
    },
     {
      ColumnName: "modifiedBy",
      DisplayName: "Modified by",
      AllowSorting: true,
    }, 
    {
      ColumnName: "action",
      DisplayName: "Action performed",
      AllowSorting: true,
    },
    {
      ColumnName: "userName",
      DisplayName: "User name",
      AllowSorting: true,
    },
    // {
    //   ColumnName: "employeeId",
    //   DisplayName: "WIN ID",
    //   AllowSorting: true,
    // },
    {
      ColumnName: "proxyUserName",
      DisplayName: "Proxy user name ",
      AllowSorting: true,
    },
  ]

  UnsentEmailsLogsColumnsList : GridColumn[] =[
    {
      ColumnName: "sentOn",
      DisplayName: "Sent date",
      AllowSorting: true,
      FormatValue: (value: any, data: any) => {
        return this.utilityService.formatDateWithTime(value, data);
      }
    },
    {
      ColumnName: "sentBy",
      DisplayName: "Sent by",
      AllowSorting: true,
    },
    {
      ColumnName: "userName",
      DisplayName: "Name",
      AllowSorting: true,
    },
    // {
    //   ColumnName: "isSent",
    //   DisplayName: "Email status",
    //   AllowSorting: true,
    // },
    {
      ColumnName: "emailRecipient",
      DisplayName: "Recipient name",
      AllowSorting: true,
    },
    // {
    //   ColumnName: "emailTemplate",
    //   DisplayName: "emailTemplate",
    //   AllowSorting: true,
    // },
  ]

  proformaInvoicesLogsColumnList  : GridColumn[] =[
        {
      ColumnName: "createdOn",
      DisplayName: "Created date",
      AllowSorting: true,
      FormatValue: (value: any, data: any) => {
        return this.utilityService.formatDateWithTime(value, data);
      }
    },
    {
      ColumnName: "createdBy",
      DisplayName: "Created by",
      AllowSorting: true,
    },
    {
      ColumnName: "modifiedOn",
      DisplayName: "Modified date",
      AllowSorting: true,
      FormatValue: (value: any, data: any) => {
        return this.utilityService.formatDateWithTime(value, data);
      }
    },
    {
      ColumnName: "modifiedBy",
      DisplayName: "Modified by",
      AllowSorting: true,
    },
    {
      ColumnName: "proformaNo",
      DisplayName: "Proforma #",
      AllowSorting: true,
    },
    {
      ColumnName: "clientOwner",
      DisplayName: "Client owner",
      AllowSorting: true,
    },
    {
      ColumnName: "geoLead",
      DisplayName: "GEO lead",
      AllowSorting: true,
    },
    {
      ColumnName: "rmd",
      DisplayName: "RMD",
      AllowSorting: true,
    },
    {
      ColumnName: "rsu",
      DisplayName: "RSU",
      AllowSorting: true,
    },
    {
      ColumnName: "proformaStatus",
      DisplayName: "Proforma status",
      AllowSorting: true,
    },
    {
      ColumnName: "openAirStatus",
      DisplayName: "OpenAir status",
      AllowSorting: true,
    },
    {
      ColumnName: "collectionsContact",
      DisplayName: "Collections contact",
      AllowSorting: true,
    },
    {
      ColumnName: "proformaLayout",
      DisplayName: "Proforma layout",
      AllowSorting: true,
    },
    {
      ColumnName: "internalNotes",
      DisplayName: "Internal notes",
      AllowSorting: true,
    },
    {
      ColumnName: "proformaNotes",
      DisplayName: "Proforma notes",
      AllowSorting: true,
    },
  ]

  userList(data : LogRequestModel) {
    return this.httpService.post<any>(this.userLogEndpoints.UserDetails, data);
  }

  proformaBatchList(data : LogRequestModel){
    return this.httpService.post<any>(this.proformaBatchPoints.ProformaBatchList, data);
  }

  proformaList(data : LogRequestModel){
    return this.httpService.post<any>(this.userLogEndpoints.ProformaIdDetails, data);
  }

  userLogData(data: LogRequestModel): Observable<UserLogResponseModel>{
    return this.httpService.post<UserLogResponseModel>(this.userLogEndpoints.UserLogs, data);
  }

  proformaBatchLogsData(data: LogRequestModel): Observable<ProformaBatchResponseModel>{
    return this.httpService.post<ProformaBatchResponseModel>(this.userLogEndpoints.ProformaBatchLogs, data);
  }

  userRolesLogData(data : LogRequestModel): Observable<UserRolesLogModel>{
    return this.httpService.post<UserRolesLogModel>(this.userLogEndpoints.UserRolesLogs, data);
  }

  proformaInvoicesLogsData(data : LogRequestModel): Observable<ProformaInvoicesLogsData>{
    return this.httpService.post<ProformaInvoicesLogsData>(this.userLogEndpoints.ProformaInvoicesLogs, data);
  }

  proxyUserLogsData(data : LogRequestModel) : Observable<ProxyUserLogsModel>{
    return this.httpService.post<ProxyUserLogsModel>(this.userLogEndpoints.ProxyUsersLogs, data);
  }

  unsentEmailsLogsData(data : LogRequestModel) : Observable <UnsentEmailResponseModal>{
    return this.httpService.post<UnsentEmailResponseModal>(this.userLogEndpoints.UnsentEmailsLogs, data);
  }

  proformaInlineLogsData(data : ListRequestModel): Observable <ProformaInlineLogsModal>{
    return this.httpService.post<ProformaInlineLogsModal>(this.userLogEndpoints.ProformaInLineLogs, data);
  }

  // get project list, services list, task list
  projectListForLogs( data : LogRequestModel) : Observable <logsResponseModel[]>{
    return this.httpService.post<logsResponseModel[]>(this.userLogEndpoints.GetProjectListForLogs, data);
  }
  
  serviceListForLogs(data : LogRequestModel) :Observable <logsResponseModel[]>{
    return this.httpService.post<logsResponseModel[]>(this.userLogEndpoints.GetServicesListForLogs, data);
  }

  taskListForLogs(data : LogRequestModel) : Observable <logsResponseModel[]>{
    return this.httpService.post<logsResponseModel[]>(this.userLogEndpoints.GetTaskListForLogs,data);
  }

}
