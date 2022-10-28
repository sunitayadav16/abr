import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbrStatus, DropdownCategoryId, Permission } from '@app/core/enums';
import { AdjustmentArrList, AdjustmentsRequestModel, MakeAdjustmentResponse, SaveAdjustmentRequest } from '@app/core/models';
import { AuthService, LoaderService, ToasterService } from '@app/core/services';
import { Subscription } from 'rxjs';
import { MakeAdjustmentService } from '../../services';
import { MakeAdjustmentCalculationService } from '../../services/make-adjustment-calculation.service';
import { Messages } from '@app/core/config';

@Component({
  selector: 'app-make-adjustments',
  templateUrl: './make-adjustments.component.html',
  styleUrls: ['./make-adjustments.component.scss']
})
export class MakeAdjustmentsComponent implements OnInit {
  readonly WriteUpdownCategoryRequest: DropdownCategoryId = DropdownCategoryId.WriteUpDownCategoryId;
  readonly AdvanceBillCategoryRequest: DropdownCategoryId = DropdownCategoryId.AdvanceBillCategoryId;

  readonly CommentAreaMaxlength: number = 1500;

  readonly Fields: any = {
    NewAdvanceBill: "New advance bill",
    AdvanceBillApplication: "Advance bill",
    GeneralCommissions: "General commissions",
    VBISCommissions: "VBIS commissions",
    VolumeChargeQuantity: "Volume Charge Quantity",
    VolumeChargeRate: "Volume Charge Rate"
  }

  proformaId: number;
  projectId: number;
  serviceItemId: number;
  taskId: number;

  adjustmentDetailsData: MakeAdjustmentResponse = {
    adjustmentId: 0,
    totalCharges: 0,
    billTotal: 0,
    deferrals: 0,
    adjustmentDetails: []
  };

  public adjustmentFormData: AdjustmentArrList[] = [{
    adjustmentId: this.adjustmentDetailsData.adjustmentId,
    adjustmentValueId: 0,
    advancedBillApplication: null,
    advancedBillCategory: null,
    advancedBillReason: null,
    comments: null,
    generalCommissionsApplication: null,
    newAdvancedBill: null,
    vbisCommissionsApplication: null,
    volumeChargeQuantity: null,
    volumeChargeRate: null,
    volumeChargeTotal: null,
    writeUpDownAmount: null,
    writeUpDownCategoryId: null,
    writeUpDownPercentage: null,
    writeUpDownReason: null,
  }];

  currentAdvanceBills: number = 0;
  currentGenralCommission: number = 0;
  currentVbisCommission: number = 0;

  currentAdvanceBillApplication: number = 0;
  currentGenralCommissionApplication: number = 0;
  currentVbisCommissionApplication: number = 0;
  currentNewAdvanceBill: number = 0;

  dataLoaded : boolean = false;

  routeSubscription!: Subscription;

  constructor(
    private makeAdjustmentService: MakeAdjustmentService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
    private router: Router,
    private calculationService: MakeAdjustmentCalculationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.proformaId = params.proformaId;
      this.projectId = +params.projectId;
      this.serviceItemId = +params.serviceId;
      this.taskId = +params.taskId || -1;
    });

    this.getAdjustmentDetails();
  }

  getAdjustmentDetails() {
    const payload: AdjustmentsRequestModel = {
      proformaId: this.proformaId,
      projectId: this.projectId,
      taskId: this.taskId,
      serviceId: this.serviceItemId
    };

    this.loaderService.showSpinner()
    this.makeAdjustmentService.getMakeAdjustmentDetails(payload).subscribe(res => {
      this.loaderService.hideSpinner();
      this.adjustmentDetailsData = res;
      this.initiateData();
      this.dataLoaded = true;
    }, error => {
      this.loaderService.hideSpinner();
    })
  }

  initiateData() {
    if (this.adjustmentDetailsData.adjustmentDetails.length > 0) this.adjustmentFormData = this.adjustmentDetailsData.adjustmentDetails;

    this.currentAdvanceBills = this.adjustmentDetailsData.availableAdvanceBills!;
    this.currentGenralCommission = this.adjustmentDetailsData.availableGeneralCommissions!;
    this.currentVbisCommission = this.adjustmentDetailsData.availableVBISCommissions!;

    this.currentAdvanceBillApplication = this.adjustmentArrZeroIndex.advancedBillApplication || 0;
    this.currentGenralCommissionApplication = this.adjustmentArrZeroIndex.generalCommissionsApplication || 0;
    this.currentVbisCommissionApplication = this.adjustmentArrZeroIndex.vbisCommissionsApplication || 0;
    this.currentNewAdvanceBill = this.adjustmentArrZeroIndex.newAdvancedBill || 0;

  }

  writeUpDownPercentageChange(event: any, index: number = 0) {
    const calculate = this.performCalculation(event);
    if (!calculate) return;

    const adjustmentFormValues = this.adjustmentFormData[index];

    if(this.calculationService.checkIfValidNumber(adjustmentFormValues.writeUpDownPercentage)){
      adjustmentFormValues.writeUpDownAmount = +this.calculationService.calculateWriteUpDownAmount(this.chargeTotal, adjustmentFormValues.writeUpDownPercentage);
    }
     
  }

  writeUpDownAmountChange(event: any, index: number = 0) {
    const calculate = this.performCalculation(event);
    if (!calculate) return;

    const adjustmentFormValues = this.adjustmentFormData[index];

    if(this.calculationService.checkIfValidNumber(adjustmentFormValues.writeUpDownAmount)){
      adjustmentFormValues.writeUpDownPercentage = +this.calculationService.calculateWriteUpDownPercentage(this.chargeTotal, adjustmentFormValues.writeUpDownAmount);
    }
      
  }

  volumeFieldChange(event: any, index: number = 0) {
    const calculate = this.performCalculation(event);
    if (!calculate) return;

    const adjustmentFormValues = this.adjustmentFormData[index];
    adjustmentFormValues.volumeChargeTotal = this.calculationService.convertToNumber(adjustmentFormValues.volumeChargeQuantity) * this.calculationService.convertToNumber(adjustmentFormValues.volumeChargeRate);
  }


  performCalculation(event: any) {
    return this.calculationService.keyCodesArr.includes(event.keyCode);
  }

  selectedWriteUpDownCategoryValue(value: number, index: number) {
    this.adjustmentFormData[index].writeUpDownCategoryId = value;
  }

  selectedAdvanceCategoryValue(value: number, index: number) {
    this.adjustmentFormData[index].advancedBillCategory = value;
  }

  openProformaCharges(data: MakeAdjustmentResponse) {
    this.router.navigateByUrl(`/home/proforma-charges/${this.proformaId}/${data.projectId}/${data.serviceId}/${data.taskId}`);
  }

  removeGroup(i: number) {
    this.adjustmentFormData.splice(i, 1);
  }


  onSubmit(form: NgForm) {
    const valid = this.validate(form);
    if (!valid) return;
    
    this.adjustmentFormData[0].adjustmentId = this.adjustmentDetailsData.adjustmentId!;
    const payload: SaveAdjustmentRequest = {
      adjustmentId: this.adjustmentDetailsData.adjustmentId!,
      projectId: this.adjustmentDetailsData.projectId!,
      serviceId: this.adjustmentDetailsData.serviceId!,
      taskId: this.adjustmentDetailsData.taskId!,
      deferrals: this.adjustmentDetailsData.deferrals!,
      deferralReason: this.adjustmentDetailsData.deferralReason!,
      billTotal: this.billedTotal,
      adjustmentsList: this.adjustmentFormData
    }
    this.makeAdjustmentService.saveMakeAdjustments(payload).subscribe(res => {
      this.goToProformaDetailpage();
      this.loaderService.hideSpinner();
    }, error => {
      this.loaderService.hideSpinner();
    })
  }

  validate(form: NgForm) {
    // Required Validation
    const invalidFields = form.invalid ||
                        (this.hasWriteUpDown && !this.adjustmentArrZeroIndex.writeUpDownCategoryId) || 
                        (this.hasNewAdvanceBill && !this.adjustmentArrZeroIndex.advancedBillCategory);
    if (invalidFields) {
      this.toasterService.warning(Messages.Warning.RequiredFields);
      return false;
    }

    // Deferral Validation
    const invalidDeferral = this.adjustmentDetailsData.deferrals > this.adjustmentDetailsData.totalCharges;
    if (invalidDeferral) {
      this.toasterService.warning(Messages.Warning.InvalidDeferral);
      return false;
    }

    // New Advance Bill Validation
    const invalidNewAdvanceBill = (this.adjustmentArrZeroIndex.newAdvancedBill < 0);
    if (invalidNewAdvanceBill) {
      this.toasterService.warning(this.swapFieldNameFromMessage(Messages.Warning.PositiveAmount, this.Fields.NewAdvanceBill));
      return false;
    }

    // Advance Bill Application Validation
    const invalidAdvanceBillApplication = this.newAdvancedBillApplication > 0;
    if (invalidAdvanceBillApplication) {
      this.toasterService.warning(this.swapFieldNameFromMessage(Messages.Warning.NegativeAmount, this.Fields.AdvanceBillApplication));
      return false;
    }
    
    // General Commission
    const invalidGeneralCommissions = this.newGeneralCommissionApplication > 0;
    if (invalidGeneralCommissions) {
      this.toasterService.warning(this.swapFieldNameFromMessage(Messages.Warning.NegativeAmount, this.Fields.GeneralCommissions));
      return false;
    }

    // VBIS Commission
    const invalidVBISCommissions = this.newVbisCommissionApplication > 0;
    if (invalidVBISCommissions) {
      this.toasterService.warning(this.swapFieldNameFromMessage(Messages.Warning.NegativeAmount, this.Fields.VBISCommissions));
      return false;
    }

    // Advance Bill Application range validation
    const invalidAdvanceBillApplicationRange = this.actualAdvanceBillWithNewAdvanceBill - Math.abs(this.newAdvancedBillApplication) < 0;
    if (invalidAdvanceBillApplicationRange) {
      this.toasterService.warning(this.swapFieldNameFromMessage(Messages.Warning.InvalidRangeAmount, this.Fields.AdvanceBillApplication));
      return false;
    }

    // General Commisisons range validation
    const invalidGeneralCommissionsApplicationRange = this.actualGeneralCommission - Math.abs(this.newGeneralCommissionApplication) < 0;
    if (invalidGeneralCommissionsApplicationRange) {
      this.toasterService.warning(this.swapFieldNameFromMessage(Messages.Warning.InvalidRangeAmount, this.Fields.GeneralCommissions));
      return false;
    }

    // VBIS Commisisons range validation
    const invalidVBISCommissionsApplicationRange = this.actualVbisCommission - Math.abs(this.newVbisCommissionApplication) < 0;
    if (invalidVBISCommissionsApplicationRange) {
      this.toasterService.warning(this.swapFieldNameFromMessage(Messages.Warning.InvalidRangeAmount, this.Fields.VBISCommissions));
      return false;
    }

    // Volume Charge quantity validation
    const invalidVolumnChargeQuantity = this.adjustmentArrZeroIndex.volumeChargeQuantity < 0;
    if (invalidVolumnChargeQuantity) {
      this.toasterService.warning(this.swapFieldNameFromMessage(Messages.Warning.PositiveAmount, this.Fields.VolumeChargeQuantity));
      return false;
    }

    // Volume Charge rate validation
    const invalidVolumnChargeRate = this.adjustmentArrZeroIndex.volumeChargeRate < 0;
    if (invalidVolumnChargeRate) {
      this.toasterService.warning(this.swapFieldNameFromMessage(Messages.Warning.PositiveAmount, this.Fields.VolumeChargeRate));
      return false;
    }

    // const invalidVolumeCharge = this.adjustmentArrZeroIndex.volumeChargeQuantity * this.adjustmentArrZeroIndex.volumeChargeRate < 0;
    // if (invalidVolumeCharge) {
    //   this.toasterService.warning(this.swapFieldNameFromMessage(Messages.Warning.InvalidRangeAmount, this.Fields.VBISCommissions));
    //   return false;
    // }

    return true;
  }

  swapFieldNameFromMessage(message: string, fieldName: string) {
    return message.replace('FIELD', fieldName);
  }


  goToProformaDetailpage() {
    this.router.navigateByUrl(`/home/proforma-details/${this.proformaId}`);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  get adjustmentArrZeroIndex() {
    return this.adjustmentFormData[0];
  }

  get currency() {
    return this.adjustmentDetailsData.currency;
  }

  get isAbrStatus(){
    return this.adjustmentDetailsData.proformaStatus;
  }

  get canEdit() {
    const hasEditAdjustment = this.authService.getRolePermissionsNameArray().includes(Permission.EditAdjustments);
    const validPermission = !(this.isAbrStatus == AbrStatus.Submitted || this.isAbrStatus == AbrStatus.Pending || this.isAbrStatus == AbrStatus.Processed);
    return validPermission && hasEditAdjustment;
  }

  get chargeTotal() {
    return this.adjustmentDetailsData?.totalCharges;
  }

  get hasDeferrals() {
    return this.adjustmentDetailsData?.deferrals != null;
  }

  get billedTotal() {
    if (this.adjustmentDetailsData == null) return 0;

    const index: number = 0;
    return this.calculationService.calculateBillTotal(this.chargeTotal, this.adjustmentFormData[index], this.adjustmentDetailsData.deferrals);
  }

  get hasNewAdvanceBill() {
    return this.adjustmentArrZeroIndex.newAdvancedBill != null;
  }

  get hasWriteUpDown() {
    return this.adjustmentArrZeroIndex.writeUpDownAmount != null || this.adjustmentArrZeroIndex.writeUpDownPercentage != null;
  }

  // General Commission Computation
  get newGeneralCommissionApplication() {
    return this.adjustmentArrZeroIndex.generalCommissionsApplication || 0;
  }

  get actualGeneralCommission() {
    return this.currentGenralCommission - this.currentGenralCommissionApplication;
  }

  get newGeneralCommission() {
    return this.actualGeneralCommission + this.newGeneralCommissionApplication;
  }

  // VBIS Commission Computation
  get newVbisCommissionApplication() {
    return this.adjustmentArrZeroIndex.vbisCommissionsApplication || 0;
  }

  get actualVbisCommission() {
    return this.currentVbisCommission - this.currentVbisCommissionApplication;
  }

  get newVbisCommission() {
    return this.actualVbisCommission + this.newVbisCommissionApplication;
  }

  // Advance Bill Application Computation
  get newAdvancedBillApplication() {
    return this.adjustmentArrZeroIndex.advancedBillApplication || 0;
  }

  get actualAdvancedBills() {
    return this.currentAdvanceBills - this.currentAdvanceBillApplication - this.currentNewAdvanceBill;
  }

  get newAdvanceBills() {
    return this.actualAdvancedBills + this.newAdvancedBillApplication + this.adjustmentArrZeroIndex.newAdvancedBill;
  }

  get actualAdvanceBillWithNewAdvanceBill(){
    return this.actualAdvancedBills + this.adjustmentArrZeroIndex.newAdvancedBill;
  }

}
