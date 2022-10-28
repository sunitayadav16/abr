import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnType, Grid, Permission } from '@app/core/enums';
import { GridColumn, ListRequestModel } from '@app/core/models';
import { AuthService, LoaderService, UtilityService } from '@app/core/services';
import { CommonGridAltComponent } from '@app/shared/components';
import { Subscription } from 'rxjs';
import { ProformaService } from '../../services';

@Component({
  selector: 'app-t2-hours',
  templateUrl: './t2-hours.component.html',
  styleUrls: ['./t2-hours.component.scss']
})
export class T2HoursComponent implements OnInit {
  @ViewChild(CommonGridAltComponent) commonGridComponent!: CommonGridAltComponent;
  grid: Grid = Grid.ProformaT2hoursGrid;
  
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
      ColumnName: "timeCategory",
      DisplayName: "Time category",
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
      DisplayName: "User - Name",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "timeInHours",
      DisplayName: "Time (hours)",
      AllowSorting: true,
      CellClass : 'float-right',
      ColumnType: ColumnType.DefaultColumn
    },    
  ];

  additionalColumnsList: GridColumn[] =[
    {
      ColumnName: "hourlyRate",
      DisplayName: "User hourly rate",
      AllowSorting: true,
      CellClass : 'float-right',
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "t2HoursValue",
      DisplayName: "Value",
      AllowSorting: true,
      ColumnType: ColumnType.AdditionalColumn,
      CellClass : 'float-right',
      FormatValue: (value: number, data: any) => {
        return this.utilityService.formatAmount(value, data);
      }
    },
    {
      ColumnName: "currency",
      DisplayName: "Currency",
      AllowSorting: true,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "clientRegion",
      DisplayName: "Region (client)",
      AllowSorting: true,
      ColumnType: ColumnType.AdditionalColumn
    },   
    {
      ColumnName: "clientRegionMarket",
      DisplayName: "Client Region(Market)",
      AllowSorting: true,
      ColumnType: ColumnType.AdditionalColumn
    },   
    {
      ColumnName: "projectLocation",
      DisplayName: "Location",
      AllowSorting: true,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "approvalStatus",
      DisplayName: "Status",
      AllowSorting: false,
      ColumnType: ColumnType.AdditionalColumn
    },

    // {
    //   ColumnName: "timeInHours",
    //   DisplayName: "Time (Hours)",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn
    // },
    // {
    //   ColumnName: "chargeType",
    //   DisplayName: "Charge Type",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn
    // },
    // {
    //   ColumnName: "hourlyRate",
    //   DisplayName: "User - Hourly rate",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn
    // },
    // {
    //   ColumnName: "currency",
    //   DisplayName: "Currency",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn
    // },
 
  ]; 

  taskId: number = 0;
  projectId: number = 0;
  proformaId : number = 0;
  routeSubscription!: Subscription;
  
  constructor( private route : ActivatedRoute,
    private proformaService : ProformaService,
    private datePipe : DatePipe,
    private loaderService : LoaderService,
    private utilityService: UtilityService,
    private authService: AuthService) { 
      this.columnsList = this.columnsList.concat(this.additionalColumnsList);
    }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.projectId = +params.projectId;
      this.taskId = +params.taskId;
      this.proformaId = +params.proformaId;
     });
  }

  filterGrid(data : ListRequestModel){
    data.projectId = this.projectId;
    data.taskId = this.taskId;
     this.loaderService.showSpinner();
     this.proformaService.getProformaT2hoursDetails(data).subscribe((res:any) =>{
       this.commonGridComponent.bindTable(res.t2HoursDetailsList, res.totalRows);
       this.loaderService.hideSpinner();
     },error =>{
       this.loaderService.hideSpinner();
     });
   }

   get hasColumnFilterPermission(){
    return this.authService.getRolePermissionsNameArray().includes(Permission.ColumnFilters);
  }

}
