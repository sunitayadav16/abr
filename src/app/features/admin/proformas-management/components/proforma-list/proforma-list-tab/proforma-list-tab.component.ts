import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ColumnType, DataCategory, FormControlType, Grid, Permission } from '@app/core/enums';
import { CellEditRequest, GridColumn, ListRequestModel, ProformaListResponse, RowFilterResponse } from '@app/core/models';
import { AuthService, LoaderService, UtilityService } from '@app/core/services';
import { CommonGridAltComponent } from '@app/shared/components';
import { ProformaManagementService } from '../../../services';

@Component({
  selector: 'proforma-list-tab',
  templateUrl: './proforma-list-tab.component.html',
  styleUrls: ['./proforma-list-tab.component.scss'],
  providers: [DatePipe]
})
export class ProformaListTabComponent implements OnInit {
  @ViewChild(CommonGridAltComponent) commonGridAltComponent!: CommonGridAltComponent;

  @Input() proformaBatchId: number = 0;
  @Output() proformaBatchDetails: EventEmitter<any> = new EventEmitter();

  grid: Grid = Grid.AdminProformaGrid;
  orderByColumnName: string = "clientRegion";

  proformaColumnsList: GridColumn[] = [
    {
      ColumnName: "clients.clientRegion",
      DisplayName: "Region (client)",
      AllowSorting: true,
      Editable: true,
      ColumnType: ColumnType.DefaultColumn,
      RowIdKey: "clients.clientId",
      EntityIdKey: "clients.clientId",
      FormControlType: FormControlType.InputText,
    },
    {
      ColumnName: "clients.clientMarket",
      DisplayName: "Market (client)",
      AllowSorting: true,
      Editable: true,
      RowIdKey: "clients.clientId",
      EntityIdKey: "clients.clientId",
      FormControlType: FormControlType.InputText,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "proformaInvoices.clientOwner",
      DisplayName: "Client owner",
      AllowSorting: true,
      Editable: true,
      ShowEllipse: true,
      RowIdKey: "proformaInvoices.clientExecutiveId",
      EntityIdKey: "proformaInvoices.proformaId",
      RequestBody: {
        roleName: 'CE'
      },
      FormControlType: FormControlType.Dropdown,
      Category: DataCategory.Users,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "projects.projectManager",
      DisplayName: "Project manager",
      AllowSorting: true,
      Editable: true,
      ShowEllipse: true,
      RowIdKey: "projects.projectManagerId",
      EntityIdKey: "projects.projectId",
      RequestBody: {
        roleName: 'PM'
      },
      FormControlType: FormControlType.Dropdown,
      Category: DataCategory.Users,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "projects.billingManager",
      DisplayName: "Billing manager",
      AllowSorting: true,
      Editable: true,
      ShowEllipse: true,
      RowIdKey: "projects.billingManagerId",
      EntityIdKey: "projects.projectId",
      RequestBody: {
        roleName: 'BM'
      },
      FormControlType: FormControlType.Dropdown,
      Category: DataCategory.Users,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "proformaInvoices.proformaNo",
      DisplayName: "Proformas",
      AllowSorting: true,
      Editable: false,
      // RowIdKey: "proformaInvoices.proformaId",
      // FormControlType: FormControlType.InputText,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "clients.clientName",
      DisplayName: "Client",
      AllowSorting: true,
      Editable: true,
      RowIdKey: "clients.clientId",
      EntityIdKey: "clients.clientId",
      FormControlType: FormControlType.InputText,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "projects.projectName",
      DisplayName: "Project",
      AllowSorting: true,
      Editable: true,
      ShowEllipse: true,
      RowIdKey: "projects.projectId",
      EntityIdKey: "projects.projectId",
      FormControlType: FormControlType.InputText,
      Category: DataCategory.Users,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "projectTasks.taskName",
      DisplayName: "Task",
      AllowSorting: true,
      Editable: true,
      RowIdKey: "projectTasks.taskId",
      EntityIdKey: "projectTasks.taskId",
      FormControlType: FormControlType.InputText,
      Category: DataCategory.Users,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "serviceItems.serviceName",
      DisplayName: "Service item",
      AllowSorting: true,
      Editable: true,
      RowIdKey: "serviceItems.serviceId",
      EntityIdKey: "serviceItems.serviceId",
      FormControlType: FormControlType.InputText,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "proformaCharges.chargeType",
      DisplayName: "Charge type",
      AllowSorting: true,
      Editable: true,
      RowIdKey: "proformaCharges.proformaChargeId",
      EntityIdKey: "proformaCharges.proformaChargeId",
      FormControlType: FormControlType.InputText,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      // totalCharges 
      ColumnName: "proformaCharges.proformaTotal",
      DisplayName: "Charge total",
      AllowSorting: true,
      Editable: false,
      // RowIdKey: "proformaCharges.proformaChargeId",
      // EntityIdKey: "proformaCharges.proformaChargeId",
      // FormControlType: FormControlType.InputNumber,
      ColumnType: ColumnType.DefaultColumn,
      FormatValue: (value: any, data: any) => this.formatAmount(value, data)

    },
    {
      ColumnName: "proformaCharges.currency",
      DisplayName: "Currency",
      AllowSorting: true,
      Editable: true,
      RowIdKey: "proformaCharges.proformaChargeId",
      EntityIdKey: "proformaCharges.proformaChargeId",
      FormControlType: FormControlType.InputText,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "proformaCharges.date",
      DisplayName: "Date",
      AllowSorting: true,
      Editable: true,
      RowIdKey: "proformaCharges.proformaChargeId",
      EntityIdKey: "proformaCharges.proformaChargeId",
      FormControlType: FormControlType.InputDate,
      ColumnType: ColumnType.DefaultColumn,
      FormatValue: (value: any, data: any) => {
        return this.utilityService.formatDate(value, data);
      }
    },
    {
      ColumnName: "proformaCharges.userName",
      DisplayName: "User",
      AllowSorting: true,
      Editable: true,
      ShowEllipse: true,
      RowIdKey: "proformaCharges.proformaChargeId",
      EntityIdKey: "proformaCharges.proformaChargeId",
      // RequestBody: {
      //   roleName: 'PL'
      // },
      FormControlType: FormControlType.InputText,
      Category: DataCategory.Users,
      ColumnType: ColumnType.DefaultColumn
    },
   
    {
      ColumnName: "proformaCharges.time",
      DisplayName: "Time (hours)",
      AllowSorting: true,
      CellClass : 'float-right',
      Editable: true,
      RowIdKey: "proformaCharges.proformaChargeId",
      EntityIdKey: "proformaCharges.proformaChargeId",
      FormControlType: FormControlType.InputNumber,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "proformaCharges.hourlyRate",
      DisplayName: "Hourly rate (LOC)",
      AllowSorting: true,
      CellClass : 'float-right',
      Editable: true,
      RowIdKey: "proformaCharges.proformaChargeId",
      EntityIdKey: "proformaCharges.proformaChargeId",
      FormControlType: FormControlType.InputNumber,
      ColumnType: ColumnType.DefaultColumn
    }
  ];

  proformaAdditionalColumnsList: GridColumn[] = [
    {
      ColumnName: "proformaInvoices.proformaDescription",
      DisplayName: "Proforma description",
      AllowSorting: true,
      Editable: true,
      RowIdKey: "proformaInvoices.proformaId",
      EntityIdKey: "proformaInvoices.proformaId",
      FormControlType: FormControlType.TextArea,
      Category: DataCategory.Users,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "projects.projectRegion",
      DisplayName: "Project region",
      AllowSorting: true,
      Editable: true,
      RowIdKey: "projects.projectId",
      EntityIdKey: "projects.projectId",
      FormControlType: FormControlType.InputText,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "projects.projectMarket",
      DisplayName: "Project market",
      AllowSorting: true,
      Editable: true,
      RowIdKey: "projects.projectId",
      EntityIdKey: "projects.projectId",
      FormControlType: FormControlType.InputText,
      ColumnType: ColumnType.AdditionalColumn
    },

    {
      ColumnName: "proformaCharges.description",
      DisplayName: "Description",
      AllowSorting: true,
      Editable: true,
      RowIdKey: "proformaCharges.proformaChargeId",
      EntityIdKey: "proformaCharges.proformaChargeId",
      FormControlType: FormControlType.TextArea,
      Category: DataCategory.Users,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "projects.availableAdvanceBills",
      DisplayName: "Available advance bills",
      AllowSorting: true,
      CellClass : 'float-right',
      Editable: false,
      // RowIdKey: "proformaInvoices.proformaId",
      // FormControlType: FormControlType.InputNumber,
      ColumnType: ColumnType.AdditionalColumn,
      FormatValue: (value: any, data: any) => this.formatAmount(value, data)
    },
    {
      ColumnName: "clients.availableGeneralCommissions",
      DisplayName: "Available general commissions",
      AllowSorting: true,
      CellClass : 'float-right',
      Editable: false,
      // RowIdKey: "proformaInvoices.proformaId",
      // FormControlType: FormControlType.InputNumber,
      ColumnType: ColumnType.AdditionalColumn,
      FormatValue: (value: any, data: any) => this.formatAmount(value, data)
    },
    {
      ColumnName: "clients.availableVBISCommissions",
      DisplayName: "Available VBIS commissions",
      AllowSorting: true,
      CellClass : 'float-right',
      Editable: false,
      // RowIdKey: "proformaInvoices.proformaId",
      // FormControlType: FormControlType.InputNumber,
      ColumnType: ColumnType.AdditionalColumn,
      FormatValue: (value: any, data: any) => this.formatAmount(value, data)
    },
    {
      ColumnName: "proformaInvoices.geoLead",
      DisplayName: "GEO lead",
      AllowSorting: true,
      Editable: true,
      ShowEllipse: true,
      RowIdKey: "proformaInvoices.geoLeadId",
      EntityIdKey: "proformaInvoices.proformaId",
      RequestBody: {
        roleName: 'GEO Lead'
      },
      FormControlType: FormControlType.Dropdown,
      Category: DataCategory.Users,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "proformaInvoices.practiseLead",
      DisplayName: "Practice lead",
      AllowSorting: true,
      Editable: true,
      ShowEllipse: true,
      RowIdKey: "proformaInvoices.practiseLeadId",
      EntityIdKey: "proformaInvoices.proformaId",
      RequestBody: {
        roleName: 'PL'
      },
      FormControlType: FormControlType.Dropdown,
      Category: DataCategory.Users,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "proformaInvoices.regionalManagingDirector",
      DisplayName: "Regional managing director",
      AllowSorting: true,
      Editable: true,
      ShowEllipse: true,
      RowIdKey: "proformaInvoices.rmdId",
      EntityIdKey: "proformaInvoices.proformaId",
      RequestBody: {
        roleName: 'RMD'
      },
      FormControlType: FormControlType.Dropdown,
      Category: DataCategory.Users,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "proformaInvoices.regionalSuperUser",
      DisplayName: "Regional super user",
      AllowSorting: true,
      Editable: true,
      ShowEllipse: true,
      RowIdKey: "proformaInvoices.rsuId",
      EntityIdKey: "proformaInvoices.proformaId",
      RequestBody: {
        roleName: 'RSU'
      },
      FormControlType: FormControlType.Dropdown,
      Category: DataCategory.Users,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "proformaCharges.proformaTotal",
      DisplayName: "Proforma total",
      AllowSorting: true,
      CellClass : 'float-right',
      Editable: true,
      RowIdKey: "proformaCharges.proformaChargeId",
      EntityIdKey: "proformaCharges.proformaChargeId",
      FormControlType: FormControlType.InputNumber,
      ColumnType: ColumnType.AdditionalColumn,
      FormatValue: (value: any, data: any) => this.formatAmount(value, data)
    },
    {
      ColumnName: "proformaCharges.totalMoney",
      DisplayName: "Total money",
      AllowSorting: true,
      CellClass : 'float-right',
      Editable: true,
      RowIdKey: "proformaCharges.proformaChargeId",
      EntityIdKey: "proformaCharges.proformaChargeId",
      FormControlType: FormControlType.InputNumber,
      ColumnType: ColumnType.AdditionalColumn,
      FormatValue: (value: any, data: any) => this.formatAmount(value, data)
    },
    {
      ColumnName: "proformaCharges.value",
      DisplayName: "Value",
      AllowSorting: true,
      CellClass : 'float-right',
      Editable: true,
      RowIdKey: "proformaCharges.proformaChargeId",
      EntityIdKey: "proformaCharges.proformaChargeId",
      FormControlType: FormControlType.InputText,
      ColumnType: ColumnType.AdditionalColumn
    }
  ];

  proformaData: ProformaListResponse[] = [];
  proformaBatchStatus: string = '';
  proformaBatchDate: string = '';

  rowFilterData!: RowFilterResponse;
  appliedRowFilter: any[] = [];
  filterRequestParam: any[] = [];
  loading: boolean = false;
  
  rowFilteraNames: object = {
    Region_Client: "clientRegions",
    Market_Client: "clientMarkets",
    Client_Owner: "clientExecutives",
    Project_Manager: "projectManagers",
    Billing_Manager: "billingManagers",
    Proformas: "proformas",
    Client: "clients",
    Project: "projectsName",
    Task: "tasksName",
    Serivce_Item: "servicesName",
    // ChargeType: "openAirStatus",
    // Users: "proformaStatus",
    // OpenAirStatus: "openAirStatus",
    // ProformaStatus: "proformaStatus",
    // PracticeLeads: "practiseLeads",
    // GeoLeads: "geoLeads",
    // RMD: "rmDs",
    // RSU: "rsUs",
  };

  checkColumnNo: number = 0;
  showHideDropdown: boolean = true;
  ShowRowFilter: boolean = true;
  filterApplied: boolean = false;

  constructor(
    private proformaService: ProformaManagementService,
    private loaderService: LoaderService,
    private datePipe: DatePipe,
    private authService: AuthService,
    private utilityService: UtilityService
    
  ) {
    this.proformaColumnsList = this.proformaColumnsList.concat(this.proformaAdditionalColumnsList);
  }

  ngOnInit(): void {
    this.getRowFilterData();
  }

  filterGrid(request: ListRequestModel) {
    request.id = this.proformaBatchId;
    request.rowFilters = this.filterRequestParam || [];
    if(this.filterApplied) request.pageNumber = 1;
    this.loaderService.showSpinner();
    this.proformaService.getPerformaList(request).subscribe((res: any) => {
      this.proformaData = res.proformaList;
      this.proformaBatchDate = res.proformaBatchDate;
      this.filterApplied = false;
      this.proformaBatchDetails.emit(res);
      this.commonGridAltComponent.bindTable(res.proformaList, res.totalRows);
      this.loaderService.hideSpinner();
    }, error => {
      this.loaderService.hideSpinner();
    });
  }

  updateCell(request: CellEditRequest) {
    this.proformaService.updateCell(request).subscribe(() => {
      this.commonGridAltComponent.filterTable();
    })
  }

  getRowFilterData() {
    this.proformaService.getRowFilterData(this.proformaBatchId).subscribe(res => {
      this.rowFilterData = res;
      this.loading = true;
    })
  }

  rowFilter(data: any){
    this.filterApplied = true;
    this.appliedRowFilter = data.filtedData;
    this.filterRequestParam = data.requestParam;
    this.commonGridAltComponent.filterTable();
  }

  removeFilter(){
    if(this.filterRequestParam.length == 0 ) return;
    this.appliedRowFilter = []; 
    this.filterRequestParam = [];
    this.commonGridAltComponent.filterTable();
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

  formatAmount(value: any, data: any) {
    return this.utilityService.formatAmount(value, data.proformaCharges);
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

}