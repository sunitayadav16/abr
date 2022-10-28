import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnType, Permission } from '@app/core/enums';
import { Grid } from '@app/core/enums/grid.enum';
import { GridColumn, ListRequestModel } from '@app/core/models';
import { AuthService, LoaderService, UtilityService } from '@app/core/services';
import { CommonGridAltComponent } from '@app/shared/components';
import { Subscription } from 'rxjs';
import { ProformaService } from '../../services';

@Component({
  selector: 'app-proforma-full-details',
  templateUrl: './proforma-full-details.component.html',
  styleUrls: ['./proforma-full-details.component.scss'],
  providers : [DatePipe]
})
export class ProformaFullDetailsComponent implements OnInit {
@ViewChild(CommonGridAltComponent) commonGridComponent!: CommonGridAltComponent;

filteredColumn: string[] = [];   
checkColumnNo: number = 0;
proformaId : number = 0;
grid: Grid = Grid.ProformaFullDetails;
routeSubscription!: Subscription;

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
    ColumnName: "proformaTotal",
    DisplayName: "Charge total",
    AllowSorting: true,
    CellClass : 'float-right',
    ColumnType: ColumnType.DefaultColumn,
    FormatValue: (value: number, data: any) => {
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
    ColumnType: ColumnType.DefaultColumn
  },
  {
    ColumnName: "time",
    DisplayName: "Time (hours)",
    AllowSorting: true,
    CellClass : 'float-right',
    ColumnType: ColumnType.DefaultColumn
  },
  {
    ColumnName: "hourlyRate",
    DisplayName: "Hourly Rate (LOC)",
    AllowSorting: true,
    CellClass : 'float-right',
    ColumnType: ColumnType.DefaultColumn
  },
];

additionalColumnsList: GridColumn[] = [
  {
    ColumnName: "chargeType",
    DisplayName: "Charge type",
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
    ColumnName: "clientMarket",
    DisplayName: "Client - Region : Market",
    AllowSorting: true,
    ColumnType: ColumnType.AdditionalColumn
  },
 
  // {
  //   ColumnName: "projectMarket",
  //   DisplayName: "Project manager",
  //   AllowSorting: true,
  //   ColumnType: ColumnType.AdditionalColumn
  // },
  {
    ColumnName: "proformaNo",
    DisplayName: "Proforma #",
    AllowSorting: true,
    ColumnType: ColumnType.AdditionalColumn
  }, 
  {
    ColumnName: "proformaStatus",
    DisplayName: "Proforma status",
    AllowSorting: true,
    ColumnType: ColumnType.AdditionalColumn
  },
  {
    ColumnName: "availableAdvanceBills",
    DisplayName: "Available Advance Bills",
    AllowSorting: true,
    CellClass : 'float-right',
    ColumnType: ColumnType.AdditionalColumn,
    FormatValue: (value: number, data: any) => {
      return this.utilityService.formatAmount(value, data);   
    }
  },
  {
    ColumnName: "availableGeneralCommissions",
    DisplayName: "Available General Commissions",
    AllowSorting: true,
    CellClass : 'float-right',
    ColumnType: ColumnType.AdditionalColumn,
    FormatValue: (value: number, data: any) => {
      return this.utilityService.formatAmount(value, data);   
    }
  },
  {
    ColumnName: "availableVBISCommissions",
    DisplayName: "Available VBIS Commissions",
    AllowSorting: true,
    CellClass : 'float-right',
    ColumnType: ColumnType.AdditionalColumn,
    FormatValue: (value: number, data: any) => {
      return this.utilityService.formatAmount(value, data);   
    }
  },
  {
    ColumnName: "description",
    DisplayName: "Description",
    AllowSorting: true,
    ColumnType: ColumnType.AdditionalColumn
  },
  {
    ColumnName: "value",
    DisplayName: "Value",
    AllowSorting: true,
    ColumnType: ColumnType.AdditionalColumn
  },
  {
    ColumnName: "proformaNotes",
    DisplayName: "Proforma notes",
    AllowSorting: true,
    ColumnType: ColumnType.AdditionalColumn
  },
  {
    ColumnName: "internalNotes",
    DisplayName: "Internal notes",
    AllowSorting: true,
    ColumnType: ColumnType.AdditionalColumn
  },
  {
    ColumnName: "additionalNotes",
    DisplayName: "Additional notes",
    AllowSorting: true,
    ColumnType: ColumnType.AdditionalColumn
  },
  {
    ColumnName: "proformaLayout",
    DisplayName: "Proforma layout",
    AllowSorting: true,

    ColumnType: ColumnType.AdditionalColumn
  },
  {
    ColumnName: "collectionsContact",
    DisplayName: "Collections contact",
    AllowSorting: true,
    ColumnType: ColumnType.AdditionalColumn
  },
]

  constructor( 
    private proformaService : ProformaService,  
    private loaderService: LoaderService,
    private route : ActivatedRoute,
    private datePipe : DatePipe,
    private utilityService: UtilityService,
    private authService: AuthService
    ) { 
      this.columnsList = this.columnsList.concat(this.additionalColumnsList);
    }

  ngOnInit(): void {

    this.routeSubscription = this.route.params.subscribe(params => {
      this.proformaId = +params.proformaId;
     });
  }


  filterGrid(data : ListRequestModel){
    data.id = this.proformaId ;
    this.loaderService.showSpinner();
    this.proformaService.getProformaFullDetails(data).subscribe((res:any) =>{
      this.commonGridComponent.bindTable(res.proformaFullDetails, res.totalRows);
      this.loaderService.hideSpinner();
    },error =>{
      this.loaderService.hideSpinner();
    });
  }

  get hasColumnFilterPermission(){
    return this.authService.getRolePermissionsNameArray().includes(Permission.ColumnFilters);
  }

}
