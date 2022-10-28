import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from '@app/core/config';
import { AbrStatus, ColumnType, Grid, Permission } from '@app/core/enums';
import { DeferralList, GridColumn, ListRequestModel } from '@app/core/models';
import { AuthService, LoaderService, ToasterService, UtilityService } from '@app/core/services';
import { CommonGridAltComponent } from '@app/shared/components';
import { Subscription } from 'rxjs';
import { MakeAdjustmentService } from '../../services';

@Component({
  selector: 'app-proforma-charges',
  templateUrl: './proforma-charges.component.html',
  styleUrls: ['./proforma-charges.component.scss'],
  providers: [DatePipe]
})
export class ProformaChargesComponent implements OnInit {
  @ViewChild(CommonGridAltComponent) commonGridComponent!: CommonGridAltComponent;

  loading: boolean = true;

  grid: Grid = Grid.ProformaFullDetails;
  checkedRowsData: DeferralList[] = [];
  public readonly Message = Messages.Error;

  columnsList: GridColumn[] = [
    {
      ColumnName: '',
      DisplayName: "Status",
      AllowSorting: false,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "clientName",
      DisplayName: "Client",
      AllowSorting: false,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "projectName",
      DisplayName: "Project",
      AllowSorting: false,
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
      CellClass: 'float-right',
      ColumnType: ColumnType.DefaultColumn,
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
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "time",
      DisplayName: "Time (hours)",
      AllowSorting: true,
      CellClass: 'float-right',
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "hourlyRate",
      DisplayName: "Hourly rate (LOC)",
      AllowSorting: true,
      CellClass: 'float-right',
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
      ColumnName: "proformaTotal", // 
      DisplayName: "Total Charges",
      AllowSorting: true,
      CellClass: 'float-right',
      ColumnType: ColumnType.AdditionalColumn,
      FormatValue: (value: any, data: any) => {
        return this.utilityService.formatAmount(value, data);
      }
    },
  ]

  totalRows: number = 0;
  projectId: number = 0;
  serviceId: number = 0;
  proformaId: number = 0;
  taskId: number = 0;
  proformaChargesData: any[] = [];

  checkedAll: boolean = false;
  checkAllChecboxesAreChecked: boolean = false;

  routeSubscription!: Subscription;

  proformaStatus: AbrStatus;

  constructor(
    private makeAdjustmentService: MakeAdjustmentService,
    private loaderService: LoaderService,
    private datePipe: DatePipe,
    private authService: AuthService,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private router: Router) {
    this.columnsList = this.columnsList.concat(this.additionalColumnsList);
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.projectId = +params.projectId;
      this.serviceId = +params.serviceId;
      this.taskId = +params.taskId;
      this.proformaId = +params.proformaId;
    });

  }

  filterGrid(data: ListRequestModel) {
    data.proformaId = this.proformaId;
    data.projectId = this.projectId;
    data.serviceId = this.serviceId,
      data.taskId = this.taskId;
    this.loaderService.showSpinner();
    this.loading = true;
    this.makeAdjustmentService.getProformaChargesDetails(data).subscribe((res: any) => {
      this.totalRows = res.totalRows;
      this.proformaChargesData = res.proformaChargesList;
      this.proformaStatus = res.proformaStatus;
      this.commonGridComponent.bindTable(res.proformaChargesList, res.totalRows);
      if (this.loading) {
        this.initilizeChecklistData()
      }

      this.updateIsDefferalData();

      this.loaderService.hideSpinner();
      this.loading = false;
    }, error => {
      this.loaderService.hideSpinner();
      this.loading = false
    });
  }

  initilizeChecklistData() {
    const checkedData = this.proformaChargesData.filter((x: DeferralList) => x.isDeferred === true)
      .map((ele: DeferralList) => {
        return {
          serviceId: this.serviceId,
          projectId: this.projectId,
          taskId: ele.taskId,
          proformaChargesId: ele.proformaChargesId,
          isDeferred: ele.isDeferred,
        }
      });

    this.checkedRowsData = this.checkedRowsData.concat(checkedData);
    this.checkedRowsData = [...new Map(this.checkedRowsData.map(item => [item['proformaChargesId'], item])).values()];
      
  }


  toggleSelection(data: any, event: any, index: number) {
    const checked = event.target.checked;

    this.proformaChargesData[index].isDeferred = checked;

    const dataIndex = this.checkedRowsData.findIndex(d => d.proformaChargesId == data.proformaChargesId);
    if (dataIndex > -1) {
      this.checkedRowsData[dataIndex].isDeferred = checked;
    } else if (checked) {
      this.checkedRowsData.push({
        taskId: data.taskId,
        proformaChargesId: data.proformaChargesId,
        projectId: data.projectId,
        serviceId: data.serviceId,
        isDeferred: true
      });
    }
    this.checkIfAllSelected();
  }

  toggleSelectionAll(checked: boolean) {
    this.checkedAll = checked;

    this.proformaChargesData.forEach(data => {
      data.isDeferred = checked;

      if (this.checkedAll) {
        const dataIndex = this.checkedRowsData.findIndex(d => d.proformaChargesId == data.proformaChargesId);
        if (dataIndex > -1) {
          this.checkedRowsData[dataIndex].isDeferred = checked;
        } else {
          this.checkedRowsData.push({
            taskId: data.taskId,
            proformaChargesId: data.proformaChargesId,
            projectId: data.projectId,
            serviceId: data.serviceId,
            isDeferred: true
          });
        }
        
      } else {
        this.checkedRowsData.forEach(d => {
          if (d.proformaChargesId == data.proformaChargesId) d.isDeferred = false;
        });
      }
    });
  }

  checkIfAllSelected() {
    const selectedChargeIDs = this.checkedRowsData.filter(d => d.isDeferred).map(d => d.proformaChargesId);
    this.checkedAll = this.proformaChargesData.length > 0 ? this.proformaChargesData.every(d => selectedChargeIDs.indexOf(d.proformaChargesId) > -1) : false;
  }

  updateIsDefferalData() {
    const selectedChargeIDs = this.checkedRowsData.filter(d => d.isDeferred).map(d => d.proformaChargesId);

    this.proformaChargesData.forEach(d => {
      d.isDeferred = selectedChargeIDs.indexOf(d.proformaChargesId) > -1;
    })

    this.checkIfAllSelected();
  }

  saveProformaCharges(values: any) {
    //  if(this.checkedRowsData.length < 1) 
    //  return this.toasterService.error(this.Message.NoChangesFoundError);

    let data = {
      deferralsList: this.checkedRowsData
    }
    this.loaderService.showSpinner();
    this.makeAdjustmentService.saveDeferrals(data).subscribe(res => {
      this.onBack();
      this.loaderService.hideSpinner();
    }, error => {
      this.loaderService.hideSpinner();
    });
  }


  onBack() {
    this.router.navigate([`home/make-adjustment/${this.proformaId}/${this.projectId}/${this.serviceId}/${this.taskId}`]);
  }

  get hasColumnFilterPermission() {
    return this.authService.getRolePermissionsNameArray().includes(Permission.ColumnFilters);
  }

  get canEdit() {
    const hasEditAdjustment = this.authService.getRolePermissionsNameArray().includes(Permission.EditAdjustments);
    const validPermission = !(this.proformaStatus == AbrStatus.Submitted || this.proformaStatus == AbrStatus.Pending || this.proformaStatus == AbrStatus.Processed);
    return validPermission && hasEditAdjustment;
  }

}
