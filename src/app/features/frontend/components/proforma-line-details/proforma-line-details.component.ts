import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnType, Permission } from '@app/core/enums';
import { Grid } from '@app/core/enums/grid.enum';
import { GridColumn, ProformaLineRequestModel } from '@app/core/models';
import { AuthService, LoaderService, UtilityService } from '@app/core/services';
import { CommonGridAltComponent } from '@app/shared/components';
import { Subscription } from 'rxjs';
import { ProformaService } from '../../services';

@Component({
  selector: 'app-proforma-line-details',
  templateUrl: './proforma-line-details.component.html',
  styleUrls: ['./proforma-line-details.component.scss'],
  providers: [DatePipe]
})
export class ProformaLineDetailsComponent implements OnInit {
  @ViewChild(CommonGridAltComponent) commonGridComponent!: CommonGridAltComponent;
  filteredColumn: string[] = [];   
  checkColumnNo: number = 0;
  grid: Grid = Grid.ProformaLineDetails;

  columnsList: GridColumn[] = [ 
    {
      ColumnName: "clientName",
      DisplayName: "Client",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "projectName",
      DisplayName: "Project",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "taskName",
      DisplayName: "Task",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn
    },    
    {
      ColumnName: "serviceName",
      DisplayName: "Service item",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "totalCharges",
      DisplayName: "Charge total",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn,
      CellClass : 'float-right',
      FormatValue: (value: any, data: any) => {
        return this.utilityService.formatAmount(value, data);
      }
    },
    {
      ColumnName: "currency",
      DisplayName: "Currency",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn
    },

    {
      ColumnName: "date",
      DisplayName: "Date",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn,
      FormatValue: (value: any, data: any) => {
        return this.utilityService.formatDate(value, data);
      }
    },
    {
      ColumnName: "userName",
      DisplayName: "User",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn,
    },
    {
      ColumnName: "time",
      DisplayName: "Time (hours)",
      AllowSorting: true,
      CellClass : 'float-right',
      ColumnType: ColumnType.DefaultColumn,
    },
    {
      ColumnName: "hourlyRate",
      DisplayName: "Hourly rate (LOC)",
      AllowSorting: true,
      CellClass : 'float-right',
      ColumnType: ColumnType.DefaultColumn
    },
  ];
  
  additionalColumnsList: GridColumn[] =[
    
    {
      ColumnName: "chargeType",
      DisplayName: "Charge type",
      AllowSorting: true,
      ColumnType: ColumnType.AdditionalColumn
    },
    // {
    //   ColumnName: "value",
    //   DisplayName: "Value",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,

    // },
    {
      ColumnName: "description",
      DisplayName: "Description",
      AllowSorting: true,
      ColumnType: ColumnType.AdditionalColumn
    },
    // {
    //   ColumnName: "totalMoney",
    //   DisplayName: "Total money",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,
    //   FormatValue: (value: number, data:any) => {
    //     return this.utilityService.formatAmount(value, data);   
    //   }
    // },
    // {
    //   ColumnName: "clientRegion",
    //   DisplayName: "Region (client)",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn
    // },
    // {
    //   ColumnName: "clientMarket",
    //   DisplayName: "Market (client)",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn
    // },
    // {
    //   ColumnName: "projectRegion",
    //   DisplayName: "Region (project)",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn
    // },
    // {
    //   ColumnName: "projectMarket",
    //   DisplayName: "Market (project)",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn
    // },
    // {
    //   ColumnName: "availableGeneralCommissions",
    //   DisplayName: "Available General Commissions",
    //   AllowSorting: true,
    //   CellClass : 'float-right',
    //   ColumnType: ColumnType.AdditionalColumn,
    //   FormatValue: (value: number, data: any) => {
    //     return this.utilityService.formatAmount(value, data);   
    //   }
    // },
    // {
    //   ColumnName: "availableVBISCommissions",
    //   DisplayName: "Available VBIS Commissions",
    //   AllowSorting: true,
    //   CellClass : 'float-right',
    //   ColumnType: ColumnType.AdditionalColumn,
    //   FormatValue: (value: number, data: any) => {
    //     return this.utilityService.formatAmount(value, data);   
    //   }
    // },
    // {
    //   ColumnName: "availableAdvanceBills",
    //   DisplayName: "Available Advance Bills",
    //   AllowSorting: true,
    //   CellClass : 'float-right',
    //   ColumnType: ColumnType.AdditionalColumn,
    //   FormatValue: (value: number, data: any) => {
    //     return this.utilityService.formatAmount(value, data);   
    //   }
    // }
  ];
    
  proformaId: number = 0;
  clientId: number = 0;
  projectId: number = 0;
  serviceId: number = 0;
  taskId : number = 0;
  routeSubscription!: Subscription;

  constructor(
     private proformaService : ProformaService,
     private loaderService : LoaderService,
     private route : ActivatedRoute,
     private datePipe: DatePipe,
     private utilityService : UtilityService,
     private authService: AuthService
     ) { 
     
       this.columnsList = this.columnsList.concat(this.additionalColumnsList);
     }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.proformaId = +params.proformaId ; 
      this.projectId = +params.projectId;
      this.clientId = +params.clientId;
      this.serviceId = +params.serviceId;
      this.taskId = +params.taskId;
      });
  }

  filterGrid(data : ProformaLineRequestModel){
   data.clientId =  this.clientId;
   data.proformaId = this.proformaId ;
   data.projectId = this.projectId;
   data.serviceId =this.serviceId,
   data.taskId = this.taskId;
    this.loaderService.showSpinner();
    this.proformaService.getProformaLineDetails(data).subscribe((res:any) =>{
      this.commonGridComponent.bindTable(res.proformaLineDetail, res.totalRows);
      this.loaderService.hideSpinner();
    },error =>{
      this.loaderService.hideSpinner();
    });
  }

  get hasColumnFilterPermission(){
    return this.authService.getRolePermissionsNameArray().includes(Permission.ColumnFilters);
  }

}
