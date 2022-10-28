import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationLinks } from '@app/core/config';
import { ColumnType, Grid, Permission } from '@app/core/enums';
import { GridColumn, ListRequestModel, RowFilterResponse } from '@app/core/models';
import { AuthService, EventService, LoaderService, UtilityService } from '@app/core/services';
import { CommonGridComponent } from '@shared/components/common';
import { Subscription } from 'rxjs';
import { ProformaService } from '../../services/proforma.service';

@Component({
  selector: 'app-available-performas',
  templateUrl: './available-proformas.component.html',
  styleUrls: ['./available-proformas.component.scss'],
  providers: [DatePipe]
})
export class AvailableProformasComponent implements OnInit {
  @ViewChild(CommonGridComponent) commonGridComponent!: CommonGridComponent;

  grid: Grid = Grid.AvailableProforma;
  
  availableProformaListData : any[] = [];

  columnsList : GridColumn[] =[
    {
      ColumnName: "proformaStatus",
      DisplayName: "ABR Status",
      AllowSorting: false,
      ColumnType: ColumnType.DefaultColumn
    }, 
    {
      ColumnName: "openAirStatus",
      DisplayName: "OpenAir Status",
      AllowSorting: false,
      ColumnType: ColumnType.DefaultColumn
    }, 
    {
      ColumnName: "proformaNo",
      DisplayName: "Invoice Proforma",
      AllowSorting: true,
      Hoverable: true,
      ColumnType: ColumnType.DefaultColumn,
    }, 
    {
      ColumnName: "clientName",
      DisplayName: "Client",
      AllowSorting: true,
      Hoverable: true,
      ColumnType: ColumnType.DefaultColumn,
    },
    {
      ColumnName: "projects",
      DisplayName: "Project(s)",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn,
    },   
    {
      ColumnName: "clientRegion",
      DisplayName: "Region (client)",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn,
    },
    {
      ColumnName: "proformaTotal",
      DisplayName: "Proforma total",
      AllowSorting: true,
      CellClass : 'float-right',
      ColumnType: ColumnType.DefaultColumn,
      // FormatValue: (value: any, data: any) => {
      //   return this.utilityService.formatAmount(value, data.proformaTotal);  
      // }
    },
  ];

  additionalColumnsList: GridColumn[] = [
    {
      ColumnName: "clientOwner",
      DisplayName: "Client owner",
      AllowSorting: true,
      ColumnType: ColumnType.AdditionalColumn,
    },
    // {
    //   ColumnName: "proformaManagers.projectManager",
    //   DisplayName: "Project manager",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,
    // },
    // {
    //   ColumnName: "proformaManagers.billingManager",
    //   DisplayName: "Billing manager",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,
    // },
    {
      ColumnName: "clientMarket",
      DisplayName: "Market (client)",
      AllowSorting: true,
      ColumnType: ColumnType.AdditionalColumn,
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
    // {
    //   ColumnName: "proformaDescription",
    //   DisplayName: "Proforma description",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,
    // }, 
    // {
    //   ColumnName: "proformaDate",
    //   DisplayName: "Proforma date",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,
    //   FormatValue: (value: any, data: any) => {
    //     return this.utilityService.formatDate(value, data);
    //   }
    // }, 
    // {
    //   ColumnName: "projectRegion",
    //   DisplayName: "Project region ",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,
    // }, 
    // {
    //   ColumnName: "projectMarket",
    //   DisplayName: "Project market",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,
    // }, 
    // {
    //   ColumnName: "serviceName",
    //   DisplayName: "Service name",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,
    // }, 
    // {
    //   ColumnName: "taskName",
    //   DisplayName: "Task name",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,
    // }, 
    // {
    //   ColumnName: "chargeType",
    //   DisplayName: "Charge type",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,
    // }, 
    // {
    //   ColumnName: "currency",
    //   DisplayName: "Currency",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,
    // },
    // {
    //   ColumnName: "totalMoney",
    //   DisplayName: "Total money",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,
    // },
    // {
    //   ColumnName: "description",
    //   DisplayName: "description",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,
    // },
    // {
    //   ColumnName: "hourlyRate",
    //   DisplayName: "Hourly rate",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,
    // },
    // {
    //   ColumnName: "totalCharges",
    //   DisplayName: "Total charges",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,
    // },
    // {
    //   ColumnName: "time",
    //   DisplayName: "Time",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,
    // },
    // {
    //   ColumnName: "value",
    //   DisplayName: "Value",
    //   AllowSorting: true,
    //   ColumnType: ColumnType.AdditionalColumn,
    // },
  
  ]

  show: boolean = false;
  hideRowHover: boolean = true;
  currentIndex!: number | null ;

  proformaBatchDate: string = '';
  rowFilterData!: RowFilterResponse;
  appliedRowFilter: any[] = [];
  filterRequestParam: any[] = [];

  rowFilteraNames: object = {
    ABR_Status: "proformaStatus",
    OpenAir_Status: "openAirStatus",
    Invoice_Proforma : "proformas",
    Client: "clients",
    Project_Managers: "projectManagers",
    Region_Client: "clientRegions",
    Billing_Managers: "billingManagers",
    Client_Executives: "clientExecutives",
  };


  loading: boolean = true;

  showHideDropdown: boolean = true;
  ShowRowFilter: boolean = true;
  filterApplied: boolean = false;

  roleChangeSub!: Subscription;
  
  constructor(
    private proformaService : ProformaService,
    private loaderService: LoaderService,
    private eventService: EventService,
    private authService: AuthService,
    private utilityService: UtilityService
  ) { 
    this.columnsList = this.columnsList.concat(this.additionalColumnsList);

    this.roleChangeSub = this.eventService.loadPageGrid.subscribe((value) => {
      if(value){
        this.getRowFilterData();
      }
    })
  }

  ngOnInit(): void {
      this.getRowFilterData();
  }


  filterProformaList(request: ListRequestModel){
    request.rowFilters = this.filterRequestParam || [];
    if(this.filterApplied) request.pageNumber = 1;
    this.currentIndex = null;
    this.hideRowHover = true;
    this.loaderService.showSpinner();
    this.proformaService.getAvailableProformaList(request).subscribe((res: any) =>{
      this.availableProformaListData = res.proformaList;
      this.proformaBatchDate = res.proformaBatchDate;
      this.filterApplied = false;
      this.loaderService.hideSpinner();
      this.commonGridComponent.bindTable(res.proformaList, res.totalRows);
    }, error =>{
      this.loaderService.hideSpinner();
    })
  }

  getStatusClass(columnName: string){
    const statusClass = columnName == 'New' ? 'status__new' : 
                        columnName == 'Working'? 'status__working': 
                        columnName == 'Pending'? 'status__pending': 
                        columnName == 'Processed'? 'status__processed': 
                        columnName == 'Rejected'? 'status__rejected': 'status__submitted';
    return statusClass;
  }

  checkColumnName(columnName: string){
    return (columnName != 'proformaStatus' && columnName != 'projects' && columnName != 'proformaTotal');
  }

  mouseHover(event: any, column : GridColumn){
    if(!column.Hoverable) return;

    this.show = true;
  }

  toogleBtn(index: number){
      this.currentIndex = index;
      this.hideRowHover =  !this.hideRowHover;
  }

  getRowFilterData() {
    this.proformaService.getRowFilterData().subscribe(res => {
      this.rowFilterData = res;
      this.loading = this.rowFilterData != null;
    })
  }

  rowFilter(data: any){
    this.filterApplied = true;
    this.appliedRowFilter = data.filtedData;
    this.filterRequestParam = data.requestParam;
    this.commonGridComponent.filterTable();
  }

  removeFilter(){
    if(this.filterRequestParam.length == 0 ) return;

    this.appliedRowFilter = []; 
    this.filterRequestParam = [];
    this.commonGridComponent.filterTable();
  }

  hideDropdown(event: any){
    if(event == 'showHideDropdown')
    {
      this.ShowRowFilter = false;
      this.showHideDropdown = true;
    }
    else {
      this.ShowRowFilter = true;
      this.showHideDropdown = false;
    }
  }

  public hideAdditionalColumn(column: GridColumn) {
    if (this.visibleColumns.includes(column.ColumnName)) return false;
    return column.ColumnType == ColumnType.AdditionalColumn;
  }



  ngOnDestroy(){
    this.roleChangeSub.unsubscribe();
  }

  get originalABRLink(){
    return ApplicationLinks.originalABRLink;
  }

  get appliedFilter(){
    return this.appliedRowFilter.length > 0;
  }

  get hasRowFilterPermission(){
    return this.authService.getRolePermissionsNameArray().includes(Permission.RowFilters);
  }

  get hasColumnFilterPermission(){
    return this.authService.getRolePermissionsNameArray().includes(Permission.ColumnFilters);
  }

  get visibleColumns() {
    return this.authService.getAdditionalVisibleColumns(this.grid);
  }

}
