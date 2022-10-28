import { CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
 
  constructor(
    private currencyPipe: CurrencyPipe,
    private datePipe : DatePipe,
    // private percentagePipe : PercentPipe
  ) { }

  /**
   * To encrypt string
   *
   * @memberof UtilityService
   */
   encrypt(text: string) {
    return atob(text);
  }

  /**
   * To decrypt string
   *
   * @memberof UtilityService
   */
  decrypt(text: string) {
    return btoa(text);

  }

  /**
 * Convert currency
 *
 * @memberof UtilityService
 */
  formatAmount(value:number, data: any){
    return this.currencyPipe.transform(value, data.currency, 'symbol', '1.2-2');
  }

  /**
 * Date format
 *
 * @memberof UtilityService
 */
  formatDate(value:string, data:any){
    return this.datePipe.transform(value, 'yyyy-MM-dd');
  }

  formatDateWithTime(value:string, data:any){
    let dateTime = this.datePipe.transform(value,'yyyy-MM-dd h:mm:ss a');
     return dateTime? dateTime : null;
  }

}
