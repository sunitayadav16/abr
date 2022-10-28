import { PercentPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AbrStatus, ColumnType, DropdownCategoryId, FormControlType, Grid, Permission } from '@app/core/enums';
import { ActionPerformedByGOTRequest, CellEditRequest, GridColumn, ProformaDetailsRequest } from '@app/core/models';
import { UnsavedChangesComponent } from '@app/core/models/unsave-changes.model';
import { AuthService, LoaderService, ToasterService, UtilityService } from '@app/core/services';
import { AdditionalNotesComponent, CommonGridAltComponent, ViewInstructionsModalComponent } from '@app/shared/components';
import { ModalService } from '@app/shared/services';
import { Subscription } from 'rxjs';
import { ProformaService } from '../../services/proforma.service';

@Component({
  selector: 'app-proforma-details',
  templateUrl: './proforma-details.component.html',
  styleUrls: ['./proforma-details.component.scss'],
  providers: [PercentPipe]
})
export class ProformaDetailsComponent implements OnInit, UnsavedChangesComponent {
  @ViewChild(CommonGridAltComponent) commonGridComponent!: CommonGridAltComponent;
  @ViewChild('form', { static: true }) ngForm!: NgForm;

  orderByColumnName: string = 'proformaNo';
  proformaLayoutRequest: DropdownCategoryId = DropdownCategoryId.ProformaLayoutId;
  grid: Grid = Grid.ProformaDetails;
  columnsList: GridColumn[] = [
    {
      ColumnName: "status",
      DisplayName: "Status",
      AllowSorting: false,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "projects.projectName",
      DisplayName: "Project(s)",
      AllowSorting: false,
      RowIdKey: "projects.projectId",
      Hoverable: true,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "projectTasks.taskName",
      DisplayName: "Task",
      AllowSorting: false,
      Hoverable: true,
      RowIdKey: "projectTasks.taskId",
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "serviceItems.serviceName",
      DisplayName: "Service item",
      AllowSorting: false,
      Hoverable: true,
      RowIdKey: "serviceItems.serviceId",
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "proformaCharges.totalCharges",
      DisplayName: "Charge amount",
      AllowSorting: false,
      CellClass : 'float-right',
      ColumnType: ColumnType.DefaultColumn,
      FormatValue: (value: number, data: any) => {
        return this.formatAmount(value);
      }
    },
    {
      ColumnName: "proformaCharges.currency",
      DisplayName: "Currency",
      AllowSorting: false,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "adjustments.deferrals",
      DisplayName: "Deferrals ($)",
      AllowSorting: false,
      CellClass : 'float-right',
      ColumnType: ColumnType.DefaultColumn,
      FormatValue: (value: number, data: any) => {
        return this.formatAmount(value);
      }
    },
    {
      ColumnName: "adjustments.deferralReason",
      DisplayName: "Deferrals reason",
      AllowSorting: false,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "adjustments.writeUpDownAmount",
      DisplayName: "Write-up/down amount",
      AllowSorting: false,
      CellClass : 'float-right',
      ColumnType: ColumnType.DefaultColumn,
      FormatValue: (value: number, data: any) => {
        return this.formatAmount(value);
      }
    },
    {
      ColumnName: "adjustments.writeUpDownPercentage",
      DisplayName: "Write-up/down %",
      AllowSorting: false,
      CellClass : 'float-right',
      ColumnType: ColumnType.DefaultColumn,
      FormatValue: (value: any, data: any) => {
        // this.percentagePipe.transform( value, '%' );
        return value + "%";
      }
    },
    {
      ColumnName: "adjustments.writeUpDownCategoryName",
      DisplayName: "Write-up/down category",
      AllowSorting: false,
      // Editable: true,
      RowIdKey: "serviceItems.serviceId",
      FormControlType: FormControlType.InputText,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "adjustments.writeUpDownReason",
      DisplayName: "Write-up/down reason",
      AllowSorting: false,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "adjustments.newAdvancedBill",
      DisplayName: "New advance bill",
      AllowSorting: false,
      CellClass : 'float-right',
      ColumnType: ColumnType.DefaultColumn,
      FormatValue: (value: number, data: any) => {
        return this.formatAmount(value);
      }
    },
    {
      ColumnName: "adjustments.advancedBillCategory",
      DisplayName: "Advance bill category",
      AllowSorting: false,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "adjustments.advancedBillReason",
      DisplayName: "Advance bill reason",
      AllowSorting: false,
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "adjustments.advancedBillApplication",
      DisplayName: "Advance bill application",
      AllowSorting: false,
      CellClass : 'float-right',
      ColumnType: ColumnType.DefaultColumn,
      FormatValue: (value: number, data: any) => {
        return this.formatAmount(value);
      }
    },
    {
      ColumnName: "adjustments.generalCommissionsApplication",
      DisplayName: "General commission application",
      AllowSorting: false,
      CellClass : 'float-right',
      ColumnType: ColumnType.DefaultColumn,
      FormatValue: (value: number, data: any) => {
        return this.formatAmount(value);
      }
    },
    {
      ColumnName: "adjustments.vbisCommissionsApplication",
      DisplayName: "VBIS commission application",
      AllowSorting: false,
      CellClass : 'float-right',
      ColumnType: ColumnType.DefaultColumn,
      FormatValue: (value: number, data: any) => {
        return this.formatAmount(value);
      }
    },
    {
      ColumnName: "adjustments.volumeChargeQuantity",
      DisplayName: "Volume charge quantity",
      AllowSorting: false,
      CellClass : 'float-right',
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "adjustments.volumeChargeRate",
      DisplayName: "Volume charge rate",
      AllowSorting: false,
      CellClass : 'float-right',
      ColumnType: ColumnType.DefaultColumn
    },
    {
      ColumnName: "adjustments.volumeChargeTotal",
      DisplayName: "Volume charge total",
      AllowSorting: false,
      CellClass : 'float-right',
      ColumnType: ColumnType.DefaultColumn,
      FormatValue: (value: number, data: any) => {
        return this.formatAmount(value);
      }
    },
    {
      ColumnName: "proformaBillTotal",
      DisplayName: "Billed total",
      AllowSorting: false,
      CellClass : 'float-right',
      ColumnType: ColumnType.DefaultColumn,
      FormatValue: (value: number, data: any) => {
        return this.formatAmount(value);
      }
    },
    {
      ColumnName: "adjustments.comments",
      DisplayName: "Comments/notes",
      AllowSorting: false,
      ColumnType: ColumnType.DefaultColumn
    },
  ]

  additionalColumnsList: GridColumn[] = [
    {
      ColumnName: "proformaCharges.chargeType",
      DisplayName: "Charge type",
      AllowSorting: false,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "clients.clientRegion",
      DisplayName: "Region (client)",
      AllowSorting: false,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "clients.clientMarket",
      DisplayName: "Market (client)",
      AllowSorting: false,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "proformaCharges.totalMoney",
      DisplayName: "Total money",
      AllowSorting: false,
      CellClass : 'float-right',
      ColumnType: ColumnType.AdditionalColumn,
      FormatValue: (value: number, data: any) => {
        return this.formatAmount(value);
      }
    },
    {
      ColumnName: "proformaCharges.description",
      DisplayName: "Description",
      AllowSorting: false,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "proformaCharges.hourlyRate",
      DisplayName: "Hourly rate",
      AllowSorting: false,
      ColumnType: ColumnType.AdditionalColumn
    },
    {
      ColumnName: "proformaCharges.totalCharges",
      DisplayName: "Total charges",
      AllowSorting: false,
      CellClass : 'float-right',
      ColumnType: ColumnType.AdditionalColumn,
      FormatValue: (value: number, data: any) => {
        return this.formatAmount(value);
      }
    },
    // {
    //   ColumnName: "proformaCharges.description",
    //   DisplayName: "Description",
    //   AllowSorting: false,
    //   ColumnType: ColumnType.AdditionalColumn
    // },
    // {
    //   ColumnName: "proformaCharges.hourlyRate",
    //   DisplayName: "Hourly rate",
    //   AllowSorting: false,
    //   ColumnType: ColumnType.AdditionalColumn
    // },
    // {
    //   ColumnName: "proformaCharges.totalCharges",
    //   DisplayName: "Total charges",
    //   AllowSorting: false,
    //   ColumnType: ColumnType.AdditionalColumn
    // },
    // {
    //   ColumnName: "proformaCharges.time",
    //   DisplayName: "Time",
    //   AllowSorting: false,
    //   ColumnType: ColumnType.AdditionalColumn
    // },
    // {
    //   ColumnName: "proformaCharges.value",
    //   DisplayName: "Value",
    //   AllowSorting: false,
    //   ColumnType: ColumnType.AdditionalColumn
    // },

  // ===========================================
    // {
    //   ColumnName: "projectTasks.totalMoney",
    //   DisplayName: "Total Money",
    //   AllowSorting: false,
    //   ColumnType: ColumnType.AdditionalColumn
    // },
    // {
    //   ColumnName: "projectTasks.totalMoney",
    //   DisplayName: "Total Money",
    //   AllowSorting: false,
    //   ColumnType: ColumnType.AdditionalColumn
    // },
    // {
    //   ColumnName: "projectTasks.totalMoney",
    //   DisplayName: "Total Money",
    //   AllowSorting: false,
    //   ColumnType: ColumnType.AdditionalColumn
    // },
    // {
    //   ColumnName: "projectTasks.totalMoney",
    //   DisplayName: "Total Money",
    //   AllowSorting: false,
    //   ColumnType: ColumnType.AdditionalColumn
    // },
  ];


  proformaDetails: any;
  proformaId: number = 0;
  internalNotes: string = '';
  proformaNotes: string = '';
  checkColumnNo: number = 0;
  filteredColumn: string[] = [];

  previousLayoutId: number = 0; 
  previousContactId: number = 0;

  clientId: number = 0;
  filteredDetailList: any[] = [];

  showMoreDetails: boolean = false;
  showHover: boolean = false;
  loader: boolean = false;
  unsavedChanges: boolean = false;
  showMore:boolean = false;
  showMoreInstructions : boolean = false;
  
  routeSubscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private proformaService: ProformaService,
    private authService: AuthService,
    private modalService: ModalService,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
    private percentagePipe : PercentPipe,
    private utilityService: UtilityService
  ) { 
    this.columnsList = this.columnsList.concat(this.additionalColumnsList);
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.proformaId = +params.proformaId;
    });

    this.getProformaDetails();
  }

  canDeactivate() {
    return this.unsavedChanges;
  }

  getProformaDetails(){
    this.loaderService.showSpinner();
    this.proformaService.getProformaDetails(this.proformaId).subscribe((res:any) => {
      this.proformaDetails = res;
      this.proformaNotes = res.proformaNotes;
      this.internalNotes = res.internalNotes;
      this.previousLayoutId = res.proformaLayoutId;
      this.previousContactId = res.collectionsContactId;
      this.clientId = res.clientid;
      this.loader = true;
      this.loaderService.hideSpinner();
      this.addColumnsValues(res.projectsList);
      this.showMoreInstructions = this.proformaDetails?.instructions?.length > 100 ? true : false;
      this.filteredDetailList = JSON.parse(JSON.stringify(res.projectsList));
      this.commonGridComponent.bindTable(res.projectsList, res.projectsList.length);
    }, error => {
      this.loaderService.hideSpinner();
    })
  }
  
  addColumnsValues(data: any[] = []){
    let chargeTotal : number = 0;
    this.proformaDetails.billTotal = this.proformaDetails.writeUpDownTotal = 0;
    data.forEach(value => {
      if(this.proformaDetails) {
        this.proformaDetails.billTotal = Number(this.proformaDetails.billTotal) + Number(value.proformaBillTotal);
        this.proformaDetails.writeUpDownTotal = Number(this.proformaDetails.writeUpDownTotal) + Number(value.adjustments.writeUpDownAmount);
        chargeTotal = chargeTotal + Number(value.proformaCharges.totalCharges);
      }
    });
    if(this.proformaDetails) this.proformaDetails.writeUpDownPercentage = (this.proformaDetails.writeUpDownTotal/chargeTotal*100).toFixed(2) + '%';
  }

  showMoreToggle(){
    this.showMoreDetails = !this.showMoreDetails;
  }

  selectedLayout(layoutId: number){
    this.proformaDetails.proformaLayoutId = layoutId;
  }

  selectedContact(contactId: number){
    this.proformaDetails.collectionsContactId = contactId;
  }

  updateCell(request: CellEditRequest){
    this.proformaService.updateCell(request).subscribe(() => {
      this.getProformaDetails();
    }); 
  }

  saveUpdates(){
    if(!this.formIsValid) return this.toasterService.error("Invalid Form");    

    let payload: ProformaDetailsRequest = {
      proformaId: this.proformaId,
      proformaNotes: this.proformaNotes,
      internalNotes: this.internalNotes,
      proformaLayoutId: this.proformaDetails.proformaLayoutId,
      collectionsContactId: this.proformaDetails.collectionsContactId,
    }
    this.proformaService.saveProformaDetails(payload).subscribe(res => {
      this.getProformaDetails();
    });
  }

  openAdditionalNotesPopup(actionName: string) {
    if(!this.formIsValid) return this.toasterService.error("Invalid Form");

    if(actionName != 'Save') {
      const hasChanges = this.unsaveChangesAlert();
      if(hasChanges) return this.toasterService.error("You haven't saved the latest changes");
    }

    const message = actionName.split(' ')[0].toLocaleLowerCase();
    const initialState = {
      proformaId: this.proformaId,
      additionalNotes: this.proformaDetails.additionalNotes,
      message: `Are you sure you want to ${message} this ABR.`
    };
    const modalRef: any = this.modalService.openModal(AdditionalNotesComponent, initialState);
    modalRef.content.onClose.subscribe((refresh: boolean) => {
      modalRef.hide();
      if(refresh) this.checkABRPerformedAction(actionName)
    })
  }

  checkABRPerformedAction(performedAction: string){
    this.loaderService.showSpinner();
    switch(performedAction){
      case 'Submit':
        this.submitABR();
        break;
      default:
        this.performedABRAction(performedAction);
        break;
    }
  }

  submitABR(){
    this.proformaService.submitABR(this.proformaId).subscribe(res => {
      this.getProformaDetails();
    })
  }

  performedABRAction(actionName: string){
    const payload: ActionPerformedByGOTRequest = {
      proformaId: this.proformaId,
      actionPerformed: actionName
    }
    this.proformaService.actionPerformByGot(payload).subscribe(res => {
      this.getProformaDetails();
    })
  }

  formatAmount(value: any){
    return this.utilityService.formatAmount(value, { currency: this.currency })
  }  

  unsaveChangesAlert(){
    if(this.proformaNotes != this.proformaDetails.proformaNotes || 
      this.internalNotes != this.proformaDetails.internalNotes || 
      this.previousLayoutId != this.proformaDetails?.proformaLayoutId || 
      this.previousContactId != this.proformaDetails?.collectionsContactId){
      return true;
    }else{
      return false;
    }
  }

  searchData(searchValue: any) {
    searchValue = searchValue.trim();
    const details = this.proformaDetails ? JSON.parse(JSON.stringify(this.proformaDetails?.projectsList)) : [];

    if (!searchValue) {
      this.filteredDetailList = details;
      if(details.length>0){
        if(this.filteredDetailList) this.commonGridComponent.bindTable(this.filteredDetailList, 0);
      }
      return;
    }
    const searchedlist = details.filter((data: any) => {
      const projects = data.projects.projectName.toLowerCase().includes(searchValue.toLowerCase());
      const region = data.projects.projectRegion.toLowerCase().includes(searchValue.toLowerCase());
      const projectMarket = data.projects.projectMarket.toLowerCase().includes(searchValue.toLowerCase());
      const serviceName = data.serviceItems.serviceName.toLowerCase().includes(searchValue.toLowerCase());
      const taskName = data.projectTasks.taskName.toLowerCase().includes(searchValue.toLowerCase());
      const chargeType = data.proformaCharges.chargeType.toLowerCase().includes(searchValue.toLowerCase());
      const currency = data.proformaCharges.currency.toLowerCase().includes(searchValue.toLowerCase());

      const matchedProperty = projects || region || projectMarket || serviceName || taskName || chargeType || currency ;
      return matchedProperty;
    });

    this.filteredDetailList = [...searchedlist];
    this.commonGridComponent.bindTable(this.filteredDetailList, 0);

  }

  openMakeAdujustment(data: any) {
   this.router.navigateByUrl(`home/make-adjustment/${this.proformaDetails.proformaId}/${data.projects.projectId}/${data.serviceItems.serviceId}/${data.projectTasks.taskId}`);
  }

  openT2HoursDetails(data: any) {
    let route = `${this.siteUrl}/t2-hours/${this.proformaDetails.proformaId}/${data.projects.projectId}/${data.projectTasks.taskId}`;
    this.openInNewWindow(route);
  }

  openProformaLineDetails(data: any){
    let route = `${this.siteUrl}/proforma-line-details/${this.proformaDetails.proformaId}/${data.projects.projectId}/${data.serviceItems.serviceId}/${data.projectTasks.taskId }/${this.proformaDetails.clientid}`
    this.openInNewWindow(route);
  }

  openProformaFullDetails(data: any){
    let route = `${this.siteUrl}/proforma-full-details/${this.proformaDetails.proformaId}`;
    this.openInNewWindow(route);
  }


  openInNewWindow(currentRoute: string) {
    // Converts the route into a string that can be used with the window.open() function
       const url = this.router.serializeUrl(
          this.router.createUrlTree([currentRoute])
        );
       window.open(url, '_blank');
     }

  checkPermissionForAction(action: string = ''){
    let permission: Boolean = false; 
    if(this.hasAllAccessPermission){
      switch(action){
        case AbrStatus.New: 
        case AbrStatus.Submitted:
          permission = this.isStatusSubmitted || this.isStatusProcessed;
          break;
        case AbrStatus.Pending:
          permission = !this.isStatusSubmitted || this.isStatusPending || this.isStatusProcessed;
          break;
        default: permission = !this.isStatusSubmitted || this.isStatusProcessed;  
      }
      return permission; 
    }else {
      switch(action){
        case AbrStatus.New:
          permission = !this.hasSaveUpdatesPermission || this.isStatusSubmitted || this.isStatusProcessed;
          break;
        case AbrStatus.Submitted:
          permission = !this.hasSubmitAbrPermission || this.isStatusSubmitted || this.isStatusProcessed;
          break;
        case AbrStatus.Pending:
          permission = !(this.hasPendingByGotPermission && this.isStatusSubmitted) || (this.isStatusPending || this.isStatusProcessed);
          break;
        case AbrStatus.Processed:
          permission = !(this.hasProcessedByGotPermission && this.isStatusSubmitted) || this.isStatusProcessed;
          break;
        default: permission = !(this.hasRejectedByGotPermission && this.isStatusSubmitted) || this.isStatusProcessed;  
      }
      return permission;
    }
  }   

  showMoreModal(){
    this.showMore = true;
    const initialState = {
      notes: this.proformaDetails?.instructions,
    };
    const modalRef = this.modalService.openModal(ViewInstructionsModalComponent, initialState, 'modal-lg');
    modalRef.content.onClose.subscribe((refresh: boolean) => {
      if(refresh) this.showMore = false; modalRef.hide();
    })
  }

  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
  }

  get siteUrl(){
    const splitUrl = window.location.href.split('/')[3];
    return splitUrl == 'home' ? `/home` : `/${splitUrl}/home`
  }

  get formIsValid(){
    return this.proformaDetails?.proformaLayoutId != null && this.proformaDetails?.collectionsContactId != null;
  }

  get currency(){
    return this.proformaDetails?.currency; 
  }

  get isStatusNew(){
    return this.proformaDetails?.proformaStatus == AbrStatus.New;
  }

  get isStatusWorking(){
    return this.proformaDetails?.proformaStatus == AbrStatus.Working;
  }

  get isStatusPending() {
    return this.proformaDetails?.proformaStatus == AbrStatus.Pending;
  }

  get isStatusProcessed(){
    return this.proformaDetails?.proformaStatus == AbrStatus.Processed;
  }

  get isStatusRejected(){
    return this.proformaDetails?.proformaStatus == AbrStatus.Rejected;
  }
  
  get isStatusSubmitted(){
    return !this.isStatusRejected && !this.isStatusNew && !this.isStatusWorking;
  }
  
  get rolePermissions() {
    return this.authService.getRolePermissionsNameArray()
  }

  get hasAllAccessPermission(){
    return this.rolePermissions.includes(Permission.AllAccess);
  }

  get hasColumnFilterPermission(){
    return this.rolePermissions.includes(Permission.ColumnFilters);
  }

  get hasSaveUpdatesPermission(){
    return this.rolePermissions.includes(Permission.SaveUpdates);
  }

  get hasSubmitAbrPermission(){
    return this.rolePermissions.includes(Permission.SubmitABR);
  }

  get hasPendingByGotPermission(){
    return this.rolePermissions.includes(Permission.PendingByGOT);
  }

  get hasProcessedByGotPermission(){
    return this.rolePermissions.includes(Permission.ProcessedByGOT);
  }

  get hasRejectedByGotPermission(){
    return this.rolePermissions.includes(Permission.RejectedByGOT);
  }

 }
