import { Injectable } from '@angular/core';
import { ApiEndpoints } from '@app/core/config';
import { ListRequestModel } from '@app/core/models';
import { AdjustmentsRequestModel, MakeAdjustmentResponse, ProformaChargesDetailsResponseModel, SaveAdjustmentRequest } from '@core/models/available-proforma';
import { HttpService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable()

export class MakeAdjustmentService {
  public readonly adjustmentEndPoints = ApiEndpoints.Adjustments;

  constructor(
    private httpService: HttpService
  ) { }
   
  getMakeAdjustmentDetails(data: AdjustmentsRequestModel): Observable<MakeAdjustmentResponse>{
    return this.httpService.post<MakeAdjustmentResponse>(this.adjustmentEndPoints.GetAdjustmentsDetails, data);
  }

  saveMakeAdjustments(data: SaveAdjustmentRequest){
    return this.httpService.post(this.adjustmentEndPoints.SaveAdjustments, data); 
  }

  getProformaChargesDetails(data: ListRequestModel): Observable<ProformaChargesDetailsResponseModel>{
    return this.httpService.post<ProformaChargesDetailsResponseModel>(this.adjustmentEndPoints.ProformaChargesDetails, data);
  }

  saveDeferrals(data : any){
    return this.httpService.post(this.adjustmentEndPoints.SaveDeferrals, data);
  }
 
}
