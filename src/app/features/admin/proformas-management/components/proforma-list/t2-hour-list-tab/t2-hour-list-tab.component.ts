import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ColumnType, Grid, Permission } from '@app/core/enums';
import { GridColumn, ListRequestModel, RowFilterResponse } from '@app/core/models';
import { LoaderService } from '@app/core/services';
import { CommonGridAltComponent } from '@app/shared/components';
import { AuthService, UtilityService } from '@core/services';
import { ProformaManagementService } from '../../../services';

@Component({
  selector: 't2-hour-list-tab',
  templateUrl: './t2-hour-list-tab.component.html',
  styleUrls: ['./t2-hour-list-tab.component.scss'],
  providers: [DatePipe]
})
export class T2HourListTabComponent implements OnInit {

  @ViewChild(CommonGridAltComponent) commonGridComponent!: CommonGridAltComponent;
  @Input() proformaBatchDate: string = '';
  @Input() proformaBatchId: number = 0;
  grid: Grid = Grid.AdminProformaGrid;

  t2HoursColumnsList: GridColumn[] = [
    {
      ColumnName: "clientRegion",
      DisplayName: "Region (client)",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "clientRegionMarket",
      DisplayName: "Market (client)",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "clientOwner",
      DisplayName: "Client owner",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "projectManager",
      DisplayName: "Project manager",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "projectBillingManager",
      DisplayName: "Billing manager",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "clientNickName",
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
      CellClass :'float-right',
      ColumnType: ColumnType.DefaultColumn
    },

    {
      ColumnName: "taskPractise",
      DisplayName: "Task - Practice : SubPractice",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "hourlyRate",
      DisplayName: "User hourly rate",
      AllowSorting: true,
      CellClass :'float-right',
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "notes",
      DisplayName: "Notes",
      AllowSorting: true,
      ColumnType: ColumnType.DefaultColumn
    },

  ];

  t2HoursAdditionalColumnsList: GridColumn[] = [
    {
      ColumnName: "userId",
      DisplayName: "User - User id",
      AllowSorting: true,
      CellClass :'float-right',
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "projectPractise",
      DisplayName: "Project - Practice : SubPractice",
      AllowSorting: true,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "currency",
      DisplayName: "Currency",
      AllowSorting: true,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "internalId",
      DisplayName: "Internal id",
      AllowSorting: true,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "approvalStatus",
      DisplayName: "Approval status",
      AllowSorting: true,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "t2HoursValue",
      DisplayName: "T2 Hours value",
      AllowSorting: true,
      CellClass :'float-right',
      ColumnType: ColumnType.AdditionalColumn,
      FormatValue: (value: number, data: any) => {
        return this.utilityService.formatAmount(value, data);
      }
    }
  ]


  showHideDropdown: boolean = true;
  ShowRowFilter: boolean = true;
  t2HourListData: any[] = [];
  checkColumnNo: number = 0;

  loading: boolean = false;
  filterApplied: boolean = false;

  rowFilterData!: RowFilterResponse;
  appliedRowFilter: any[] = [];

  filterRequestParam: any[] = [];

  rowFilteraNames: object = {
    Region_Client: 'clientRegions',
    Market_Client: 'clientMarkets',
    Client_Owner: 'clientExecutives',
    Project_Manager: 'projectManagers',
    Billing_Manager: "billingManagers",
    Clients: 'clients',
    Project_Name: 'projectsName',
    Task_Name: 'tasksName',
    Time_Category: 'timeCategory',
    Users: 'users',
    Task_Practise: 'taskPractice',
  };

  constructor(
    private proformaService: ProformaManagementService,
    private loaderService: LoaderService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private utilityService: UtilityService
  ) {
    this.t2HoursColumnsList = this.t2HoursColumnsList.concat(this.t2HoursAdditionalColumnsList);
  }

  ngOnInit(): void {
    this.getRowFilterData();
  }

  filterGrid(request: ListRequestModel) {
    request.proformaBatchId = this.proformaBatchId;
    request.rowFilters = this.filterRequestParam || [];
    if(this.filterApplied) request.pageNumber = 1;
    this.loaderService.showSpinner();
    this.proformaService.getT2HoursList(request).subscribe((res: any) => {
      this.t2HourListData = res.t2HoursList;
      this.filterApplied = false;
      this.commonGridComponent.bindTable(res.t2HoursList, res.totalRows);
      this.loaderService.hideSpinner();
    }, error => {
      this.loaderService.hideSpinner();
    });
  }


  hideDropdown(event: any) {
    if (event == 'showHideDropdown') {
      this.ShowRowFilter = false;
      this.showHideDropdown = true;
    }
    else {
      this.ShowRowFilter = true;
      this.showHideDropdown = false;
    }
  }

  getRowFilterData() {
    this.proformaService.getT2HoursFilterData(this.proformaBatchId).subscribe(res => {
      this.rowFilterData = res;
      this.loading = true;
    });
  }

  removeFilter() {
    if (this.filterRequestParam.length == 0) return;
    this.appliedRowFilter = [];
    this.filterRequestParam = [];
    this.commonGridComponent.filterTable();
  }

  rowFilter(data: any) {
    this.filterApplied = true;
    this.appliedRowFilter = data.filtedData;
    this.filterRequestParam = data.requestParam;
    this.commonGridComponent.filterTable();
  }


  get appliedFilter() {
    return this.appliedRowFilter.length > 0;
  }

  get hasRowFilterPermission() {
    return this.authService.getRolePermissionsNameArray().includes(Permission.RowFilters);
  }

  get hasColumnFilterPermission(){
    return this.authService.getRolePermissionsNameArray().includes(Permission.ColumnFilters);
  }
}
