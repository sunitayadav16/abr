import { DatePipe, SlicePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogsType } from '@app/core/enums/logs.enum';
import { GridColumn, ListRequestModel, LogRequestModel, logsResponseModel, ProformaBatchLogsModifiedDataModel, UserLogsModifiedDataModel, UserModel } from '@app/core/models';
import { EventService, LoaderService, UtilityService } from '@app/core/services';
import { CommonGridAltComponent, ViewInstructionsModalComponent } from '@app/shared/components';
import { ModalService } from '@app/shared/services';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LogManagementService } from '../../services/log-management.service';

@Component({
  selector: 'app-logs-details',
  templateUrl: './logs-details.component.html',
  styleUrls: ['./logs-details.component.scss'],
  providers: [DatePipe, SlicePipe]
})
export class LogsDetailsComponent implements OnInit {
  @ViewChild(CommonGridAltComponent) commonGridAltComponent!: CommonGridAltComponent;

  userData: UserModel = {};

  events: Event[] = [];

  listData: any = [];
  logTypeValue: GridColumn[] = [];

  searchValue: string = '';
  logType: string = '';
  bindLable: string = '';
  bindValue: string = '';
  labelName: string = 'User logs details';
  loading: boolean = false;
  id: number;
  showMore: boolean = false;
  showMoreInstructions: boolean = false;
  isLogMode: boolean = true;
  initialCheck : boolean = false;


  userLogsColumnsList = this.logsService.userLogsColumnsList;

  proformaBatchLogsColumnsList = this.logsService.proformaBatchLogsColumnsList;

  userRolesLogColumnsList = this.logsService.userRolesLogColumnsList;

  proformaInvoicesLogsColumnList = this.logsService.proformaInvoicesLogsColumnList;

  proxyUserLogColumnList = this.logsService.ProxyUserLogColumnList;

  unsentEmailsLogColumnList = this.logsService.UnsentEmailsLogsColumnsList;

  proformaInlineLogColumnList = this.logsService.ProformaInlineLogsColumnsList;

  routeSubscription!: Subscription;
  searchBounce = new Subject<any>();

  mainId: number;
  projectId: number;
  serviceId: number;
  taskId: number;
  userLogData :  any[] = [];
  userLogsModifiedData: UserLogsModifiedDataModel[] = [];
  batchLogsModifiedData: ProformaBatchLogsModifiedDataModel[] = [];
  proformaBatchLogsData: any[] = [];

  // Proforma line detail calls
  projectListData: logsResponseModel[] = [];
  serviceItemListData: logsResponseModel[] = [];
  taskListData: logsResponseModel[] = [];
  
  logsCountCheck: number = 0;
  allowPagination: boolean = false;
  constructor(
    private eventService: EventService,
    private logsService: LogManagementService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef,
    private modalService: ModalService,
    private utilityService: UtilityService
  ) { }


  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(param => {
      this.logType = param.logCategoryName;
      this.logTypeValue = (this.logType == LogsType.UserLogs) ? this.userLogsColumnsList :
        (this.logType == LogsType.ProformaBatchLogs) ? this.proformaBatchLogsColumnsList :
          (this.logType == LogsType.UserRolesLogs) ? this.userRolesLogColumnsList :
            (this.logType == LogsType.ProformaInvoicesLogs) ? this.proformaInvoicesLogsColumnList :
              (this.logType == LogsType.EmailLogs) ? this.unsentEmailsLogColumnList :
                (this.logType == LogsType.ProformaInLineLogs) ? this.proformaInlineLogColumnList : this.proxyUserLogColumnList;
      
      this.initialCheck = true;
      this.mainId = null;
      this.listData = [];
      this.getUserData();
      this.loadPageGrid();
      this.checkUserInlistData();
      this.emptyAllIDs();
    });
  }

  initialRequestData() {
    let data: LogRequestModel = {
      id: -1, searchValue: this.searchValue,
      pageNumber: 1,
      pageSize: 10,
      sortColumn: '',
      sortOrder: 'asc',
    };
    return data;
  }

  getUserData(value: string = '') {
    let data = this.initialRequestData();
    
    if (this.logType == LogsType.ProformaBatchLogs || this.logType == LogsType.EmailLogs) {
      this.getProformaBatchId(data);
      return;
    } else if (this.logType == LogsType.ProformaInvoicesLogs || this.logType == LogsType.ProformaInLineLogs) {
      this.getProformaId(data);
      return;
    }

    this.logsService.userList(data).subscribe(res => {
      if (res.length > 0) {
        this.bindLable = "name"; this.bindValue = "userId"; this.listData = res;
      }
      this.logsCountCheck = 0;
     });
  }

  getProformaBatchId(data: LogRequestModel) {
    this.logsService.proformaBatchList(data).subscribe(res => {
      this.bindLable = 'proformaBatchName';
      this.bindValue = 'proformaBatchId';
      this.listData = res.proformaBatchList;   
      this.logsCountCheck = 0;
    })
  }

  getProformaId(data: LogRequestModel) {
    this.logsService.proformaList(data).subscribe(res => {
      this.bindLable = "name";
      this.bindValue = "id";
      this.listData = res;
      this.logsCountCheck = 0;
    })
  }


  changeDropdown(event) {
    if (!event) {
      if (this.searchValue) {
        this.searchValue = null;
      }
      this.listData = [];
      this.emptyAllIDs();
      this.getUserData(); 
      return;
    }

    if (event) {
      this.mainId = event.userId ? event.userId : event.id ? event.id : event.proformaBatchId;
      this.searchValue = null;

      if(this.logType == LogsType.ProformaInLineLogs) {
        this.getProjectDropdownList();
      }
    }

    this.emptyAllIDs();
    this.initialCheck = false;
    this.logsCountCheck = 0;
    this.loadPageGrid();
    this.filterGrid(this.initialRequestData()); 
  }


  filterGrid(requestData: LogRequestModel) {
    if(requestData.pageNumber > 1 || requestData.pageSize > 10) this.allowPagination = true;

    if(this.allowPagination) this.logsCountCheck = 0;

    this.logsCountCheck ++;
    if(this.logsCountCheck > 1 || this.initialCheck) return; 

    requestData.id = this.mainId ? this.mainId : -1;
    (this.logType === LogsType.UserLogs) ? this.getUserLogsData(requestData) :
      (this.logType === LogsType.ProformaBatchLogs) ? this.getProformaBatchLogsData(requestData) :
        (this.logType === LogsType.UserRolesLogs) ? this.getUserRolesLogData(requestData) :
          (this.logType === LogsType.ProformaInvoicesLogs) ? this.getProformaInvoicesLogsData(requestData) :
            (this.logType === LogsType.EmailLogs) ? this.getUnsentEmailsLogData(requestData) :
              (this.logType == LogsType.ProformaInLineLogs) ? this.getProformaInLineLogData(requestData): this.getProxyUserLogData(requestData);
  

    if(requestData.pageNumber == 1 && requestData.pageSize == 10) this.allowPagination = false;          
    this.cdr.detectChanges();

  }


  getUserLogsData(data: LogRequestModel) {

    if (data.id == 0 || data.id == null) return;

    this.loaderService.showSpinner();
    this.isLogMode = false;
    this.userLogsModifiedData = [];
    this.logsService.userLogData(data).subscribe((res: any) => {
      this.userLogData = res.usersList;
      this.createUserLogsData();
      this.commonGridAltComponent.bindTable(this.userLogsModifiedData, res.rowsCount);

      this.loaderService.hideSpinner();
    }, error => {
      this.loaderService.hideSpinner();
    });
  }

  createUserLogsData(){
    if(this.userLogData){
      this.userLogData.forEach(data => {
        this.userLogsModifiedData.push({
          actionPerformedDate: data.modifiedOn ? data.modifiedOn : data.createdOn,
          actionPerformedBy: data.modifiedBy ? data.modifiedBy : data.createdBy,
          actionPerformed: data.isDeleted == true ? 'DELETE' : data.modifiedOn ? 'MODIFY' : "INSERT",
          name: data.name,
          email: data.email,
          isActive: data.isActive ? 'Active' : 'Inactive'
        })
      });
    } else {
      this.userLogsModifiedData = [];
    }
  }


  getProformaBatchLogsData(data: LogRequestModel) {
    if (data.id == 0 || data.id == null) return;
    this.loaderService.showSpinner();
    this.isLogMode = false;
    this.batchLogsModifiedData = [];
    this.logsService.proformaBatchLogsData(data).subscribe((res: any) => {
      this.proformaBatchLogsData = res.proformaBatchesLogsList;
      this.createProformaBatchLogsData();
      this.loaderService.hideSpinner();
      this.commonGridAltComponent.bindTable(this.batchLogsModifiedData, res.rowsCount);

    }, error => {
      this.loaderService.hideSpinner();
    });
  }

  createProformaBatchLogsData(){
    if(this.proformaBatchLogsData){
      this.proformaBatchLogsData.forEach(data => {
        this.batchLogsModifiedData.push({
          actionPerformedDate: data.modifiedOn ? data.modifiedOn : data.createdOn,
          actionPerformedBy: data.modifiedBy ? data.modifiedBy : data.createdBy,
          actionPerformed: data.isDeleted == true ? 'DELETE' : data.modifiedOn ? 'MODIFY' : "INSERT",
          proformaBatchName: data.proformaBatchName,
          instructions: data.instructions,
          proformaStatus: data.proformaStatus
        })
      });

      this.batchLogsModifiedData.map(data => data.showMore = false);
      this.batchLogsModifiedData.forEach((ele: any) => {
        if (ele.instructions) {
          ele.showMore = ele?.instructions?.length > 30 ? true : false;
        }
      });
    } else {
      this.batchLogsModifiedData = [];
    }
  }

  getUserRolesLogData(data: LogRequestModel) {
    if (data.id == 0 || data.id == null) return;
    this.loaderService.showSpinner();
    this.isLogMode = false;
    this.logsService.userRolesLogData(data).subscribe((res: any) => {
      this.commonGridAltComponent.bindTable(res.userRolesLogsList, res.rowsCount);
      this.loaderService.hideSpinner();
    }, error => {
      this.loaderService.hideSpinner();
    });

  }

  getProformaInvoicesLogsData(data: LogRequestModel) { 
    if (data.id == 0 || data.id == null) return;
    this.loaderService.showSpinner();
    this.logsService.proformaInvoicesLogsData(data).subscribe((res: any) => {
      this.commonGridAltComponent.bindTable(res.proformaInvoiceLogsList, res.rowsCount);
      this.loaderService.hideSpinner();
    }, error => {
      this.loaderService.hideSpinner();
    });

  }

  getUnsentEmailsLogData(data: LogRequestModel) {
    if (data.id == 0 || data.id == null) return;
    this.loaderService.showSpinner();
    this.isLogMode = false;
    this.logsService.unsentEmailsLogsData(data).subscribe((res: any) => {
       this.commonGridAltComponent.bindTable(res.emailsLogsList, res.rowsCount);
      this.loaderService.hideSpinner();
    }, error => {
      this.loaderService.hideSpinner();
    });

  }

  getProxyUserLogData(data: LogRequestModel) {
    if (data.id == 0 || data.id == null) return;
    this.loaderService.showSpinner();
    this.isLogMode = true;
    this.logsService.proxyUserLogsData(data).subscribe((res: any) => {
      this.commonGridAltComponent.bindTable(res.proxyUsersLogsList, res.rowsCount);
      this.loaderService.hideSpinner();
    }, error => {
      this.loaderService.hideSpinner();
    });

  }

  getProjectDropdownList() {
    const payload: LogRequestModel = {
      id: this.mainId,
      searchValue: this.searchValue
    }

    if (this.mainId == null) return;
    this.logsService.projectListForLogs(payload).subscribe(projects => {
      this.projectListData = projects;
    })
  }

  onSelectingProjects($event) {
    if(!$event) {
      this.serviceItemListData = []; this.serviceId = null; return;
    }

    this.projectId = $event.id; this.searchValue = null;

    this.getServiceItemDropdownList()
  }

  getServiceItemDropdownList() {
    const payload: LogRequestModel = {
      id: this.projectId,
      searchValue: this.searchValue
    }
    this.logsService.serviceListForLogs(payload).subscribe(service => {
      this.serviceItemListData = service;
    })
  }

  onSelectingServices($event) {
    if (!$event) {
      this.taskListData = [];  this.taskId = null;
      return;
    }

    this.serviceId = $event.id; this.taskId = null; this.searchValue = null;
    this.getTaskDropdownList();
  }

  getTaskDropdownList() {
    const payload: LogRequestModel = {
      id: this.serviceId,
      searchValue: this.searchValue
    }
    this.logsService.taskListForLogs(payload).subscribe(tasks => {
      this.taskListData = tasks;
    })
  }

  onSelectingTasks($event) {
    this.logsCountCheck = 0;
    if ($event) {
      this.taskId = $event.id;
      this.filterGrid(this.initialRequestData());
    } else return;
  }


  getProformaInLineLogData(data: LogRequestModel) {
    
    if(!(this.mainId && this.projectId && this.serviceId && this.taskId)) return;

    const payload: ListRequestModel = {
      id: -1,
      proformaId: this.mainId,
      projectId: this.projectId,
      serviceId: this.serviceId,
      taskId: this.taskId,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize
    }
    this.loaderService.showSpinner();
    this.isLogMode = true;

    this.logsService.proformaInlineLogsData(payload).subscribe((res: any) => {
      this.commonGridAltComponent.bindTable(res.proformaInlineLogsList, res.rowsCount);
      this.loaderService.hideSpinner();
    }, error => {
      this.loaderService.hideSpinner();
    });
  }

  showMoreModal(instructions: string) {
    if (instructions == null) return;

    this.showMore = true;
    const initialState = {
      notes: instructions,
    };
    const modalRef = this.modalService.openModal(ViewInstructionsModalComponent, initialState, 'modal-lg');
    modalRef.content.onClose.subscribe((refresh: boolean) => {
      if (refresh) this.showMore = false; modalRef.hide();
    })
  }


  checkUserInlistData() {
    this.searchBounce.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(value => {
      this.searchValue = value.target.value;
      this.getUserData();
    });
  }


  loadPageGrid() {
    (this.logType == LogsType.UserLogs) ? this.labelName = 'User Details Log' :
      (this.logType == LogsType.ProformaBatchLogs) ? this.labelName = 'Proforma Batch Log' :
        (this.logType == LogsType.UserRolesLogs) ? this.labelName = 'User Roles Log':
          (this.logType == LogsType.ProformaInvoicesLogs) ? this.labelName = 'Proforma Invoice Log' :
            (this.logType == LogsType.EmailLogs) ? this.labelName = 'Emails Log' :
              (this.logType == LogsType.ProformaInLineLogs) ? this.labelName = 'Proforma Line Detail Log': this.labelName = 'User Proxy Log';

    this.eventService.loadPageGrid.next(true);
  }


  showGrid() {
    const show = this.logType == LogsType.ProformaInLineLogs ? (this.projectId && this.taskId && this.serviceId) != null : this.mainId != null;
    return show;
  }

  formatDate(value: string, data: any){
    return this.utilityService.formatDateWithTime(value, data);
  }

  emptyAllIDs() {
    this.projectId = null;
    this.serviceId = null;
    this.taskId = null;
    this.projectListData = [];
    this.serviceItemListData = [];
    this.taskListData = [];
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
