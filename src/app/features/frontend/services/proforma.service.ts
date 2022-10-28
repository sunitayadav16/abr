import { Injectable } from '@angular/core';
import { ApiEndpoints } from '@app/core/config';
import { ActionPerformedByGOTRequest, 
  CellEditRequest, 
  ListRequestModel, 
  ProformaDetailsRequest, 
  AvailableProformaRequestList, 
  AvailableProformaResponseModel, 
  ProformaFullDetailsResponseModel, 
  ProformaLineRequestModel, 
  RowFilterResponse} from '@app/core/models';
import { ProformaLineResponseModel, ProformaT2hoursResponseModel,  } from '@app/core/models/available-proforma';
import { HttpService } from '@app/core/services';
import { Observable } from 'rxjs';

@Injectable()
export class ProformaService {
  public readonly availableProformaEndpoints = ApiEndpoints.AvailableProforma;
  public readonly proformaEndPoints = ApiEndpoints.Proforma;
  public readonly commonEndPoints = ApiEndpoints.Common;
  public readonly proformaDetailsEndPoints = ApiEndpoints.ProformaDetails;

 
  constructor(
    private httpService: HttpService,
  ) { }

  getAvailableProformaList(data: AvailableProformaRequestList): Observable<AvailableProformaResponseModel> {
    return this.httpService.post<AvailableProformaResponseModel>(this.availableProformaEndpoints.AvailableProformaList, data);
  }

  getRowFilterData(): Observable<RowFilterResponse> {
    return this.httpService.post<RowFilterResponse>(ApiEndpoints.Adjustments.RowFilterData, "");
}

  getProformaDetails(proformaId: number){
    let data = {
      proformaId: proformaId
      // rowFilters: [],
      // searchValue: ''
    }
    return this.httpService.post(this.availableProformaEndpoints.ProformaDetails, data)
  }

  updateCell(data: CellEditRequest){
    return this.httpService.post(this.proformaEndPoints.UpdateSingleCell, data);
  }

  saveProformaDetails(data: ProformaDetailsRequest){
    return this.httpService.post(this.proformaEndPoints.SaveProformaDetails, data);
  }

  uploadFiles(data: FormData){
    return this.httpService.uploadformData(this.commonEndPoints.FileUpload, data);
  }

  deleteUploadedFile(fileId: number){
    return this.httpService.post(this.commonEndPoints.DeleteProformaUploadedFile, {fileId});
  }

  downloadFile(fileId: number){
    return this.httpService.downloadGetMethod(`${this.commonEndPoints.DownloadFile}/${fileId}`)
  }

  submitABR(proformaId: number){
    return this.httpService.post(this.proformaEndPoints.SubmitABR, {proformaId})
  }

  actionPerformByGot(data: ActionPerformedByGOTRequest){
    return this.httpService.post(this.proformaEndPoints.ActionsPerformedByGOT, data);
  }

  getProformaFullDetails(data: ListRequestModel): Observable<ProformaFullDetailsResponseModel>{
    return this.httpService.post<ProformaFullDetailsResponseModel>(this.proformaDetailsEndPoints.FullProformaDetails , data);
  }

  getProformaLineDetails(data: ProformaLineRequestModel): Observable<ProformaLineResponseModel>{
    return this.httpService.post<ProformaLineResponseModel>(this.proformaDetailsEndPoints.ProformaLineDetails, data);
  }

  getProformaT2hoursDetails (data: ListRequestModel): Observable<ProformaT2hoursResponseModel>{
    return this.httpService.post<ProformaT2hoursResponseModel>(this.proformaDetailsEndPoints.T2HoursDetails, data);
  }
}
