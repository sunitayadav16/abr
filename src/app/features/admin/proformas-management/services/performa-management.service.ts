import { Injectable } from '@angular/core';
import { ApiEndpoints } from '@core/config';
import { AddUpdateInstructionsRequest, CellEditRequest, ChangeProformaStatus, DeleteProformaBatch, ListRequestModel, ProformaBatchResponseModel, ProformaListResponse, RowFilterResponse, T2HoursListResponse, ValidateProformaDetails } from '@core/models';
import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProformaManagementService {

  public readonly proformaEndPoints = ApiEndpoints.Proforma;
  public readonly proformaDetailsEndPoints = ApiEndpoints.ProformaDetails;
  public readonly adjustmentEndPoints = ApiEndpoints.Adjustments;
  public readonly downloadExcelEndPoint = ApiEndpoints.DownloadExcel;
  public readonly uploadOtherExcels = ApiEndpoints.UploadOtherExcels;

  constructor(
    private httpService: HttpService
  ) { }

  getProformaBatchList(data : ListRequestModel) {
    return this.httpService.post<ProformaBatchResponseModel[]>(this.proformaEndPoints.ProformaBatchList, data)
  }

  updateProformaBatchStatus(payload: ChangeProformaStatus){
    return this.httpService.post(this.proformaEndPoints.UpdateProformaBatchStatus, payload);
  }

  deletePerformaBatch(id: DeleteProformaBatch){
    return this.httpService.post(this.proformaEndPoints.DeleteProformaBatch, id);
  }

  performaVerification(date: string): Observable<ValidateProformaDetails> {
    return this.httpService.post<ValidateProformaDetails>(this.proformaEndPoints.ValidateProformaBatch, { date });
  }

  uploadproformaBatch(data: FormData){
    return this.httpService.post(this.proformaEndPoints.UploadPerformaBatch, data);
  }

  uploadAdvanceCommissions(data: FormData){
    return this.httpService.post(this.proformaEndPoints.UploadBillsExcel, data);
  }
  
  getPerformaList(proformaBatchRequest: ListRequestModel): Observable<ProformaListResponse[]>{
    return this.httpService.post<ProformaListResponse[]>(this.proformaEndPoints.ProformaList, proformaBatchRequest )
  }

  getT2HoursList(t2HourRequest: ListRequestModel): Observable<T2HoursListResponse[]>{
    return this.httpService.post<T2HoursListResponse[]>(this.proformaEndPoints.T2HoursList, t2HourRequest);
  }

  updateCell(data: CellEditRequest){
    return this.httpService.post(this.proformaEndPoints.UpdateSingleCell, data);
  }

  getRowFilterData(proformaBatchId: number): Observable<RowFilterResponse>{
    return this.httpService.post<RowFilterResponse>(this.proformaDetailsEndPoints.ProformaListRowFiltersData, {proformaBatchId})
  }

  getT2HoursFilterData(proformaBatchId: number): Observable<RowFilterResponse>{
    return this.httpService.post<RowFilterResponse>(this.proformaDetailsEndPoints.T2HoursRowFilterData, {proformaBatchId})
  }

  downloadFile(proformaBatchId: number){
    return this.httpService.downloadGetMethod(`${this.downloadExcelEndPoint.DownloadExcel}/${proformaBatchId}`);
  }

  uploadOpenAirStatus(data: FormData){
    return this.httpService.post(this.uploadOtherExcels.UploadOpenAirStatus, data);
  }

  updateAdditionalNotes(data: AddUpdateInstructionsRequest){
    return this.httpService.post(this.proformaEndPoints.AddUpdateInstructions, data);
  }
}
