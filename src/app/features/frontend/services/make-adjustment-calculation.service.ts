import { Injectable } from '@angular/core';
import { AdjustmentCaluclationModel } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class MakeAdjustmentCalculationService {
  
  readonly keyCodesArr: number[] = [8, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 109, 189];

  constructor() { }


  checkIfValidNumber(value: any) {
    return !isNaN(value) && !isNaN(parseFloat(value));
  }

  convertToNumber(value: any) {
    if (this.checkIfValidNumber(value)) return Number(value);
    return 0;
  }

  calculateWriteUpDownAmount(chargeTotal: any, writeDownPercentage: any) {
    const amount = (this.convertToNumber(chargeTotal) * this.convertToNumber(writeDownPercentage) / 100);
    return Number(amount).toFixed(2);
  }

  calculateWriteUpDownPercentage(chargeTotal: any, writeUpDownAmount: any) {
    const percentage = (this.convertToNumber(writeUpDownAmount) / this.convertToNumber(chargeTotal) * 100);
    return Number(percentage).toFixed(2);
  }
  
  calculateBillTotal(proformaTotal: any, adjustmentDetailsData: AdjustmentCaluclationModel, deferrals: any) {
    proformaTotal = this.convertToNumber(proformaTotal); 
    deferrals = this.convertToNumber(deferrals);

    const writeUpDownAmount = this.convertToNumber(adjustmentDetailsData.writeUpDownAmount);
    const newAdvancedBill = this.convertToNumber(adjustmentDetailsData.newAdvancedBill);
    const advancedBillApplication = this.convertToNumber(adjustmentDetailsData.advancedBillApplication);
    const generalCommissionsApplication = this.convertToNumber(adjustmentDetailsData.generalCommissionsApplication);
    const vbisCommissionsApplication = this.convertToNumber(adjustmentDetailsData.vbisCommissionsApplication);
    const volumeChargeTotal = this.convertToNumber(adjustmentDetailsData.volumeChargeTotal);

    const billTotalAmount = (proformaTotal + writeUpDownAmount + newAdvancedBill + advancedBillApplication + generalCommissionsApplication + vbisCommissionsApplication + volumeChargeTotal) - deferrals;

    return +billTotalAmount.toFixed(2);
  }

}
