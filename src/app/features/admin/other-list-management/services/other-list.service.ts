import { Injectable } from '@angular/core';
import { ApiEndpoints } from '@app/core/config';
import { CollectionContactsResponse, GlobalCodeRequest, GlobalCodeResponse, ListRequestModel } from '@app/core/models';
import { HttpService } from '@app/core/services';
import { Observable } from 'rxjs';

@Injectable()
export class OtherListService {

  public readonly apiEndPoints = ApiEndpoints.Common;
  public readonly upoloadApiEndPoints = ApiEndpoints.UploadOtherExcels;

  constructor(
    private httpService: HttpService
  ) { }

  getGlobalCodes(data: ListRequestModel): Observable<GlobalCodeResponse>{
    return this.httpService.post<GlobalCodeResponse>(this.apiEndPoints.GetGlobalCodes, data)
  }

  uploadExcelFiles(data: FormData){
    return this.httpService.post(this.upoloadApiEndPoints.UploadGlobalCodes, data);
  }

  getCollectionContact(data: ListRequestModel): Observable<CollectionContactsResponse>{
    return this.httpService.post<CollectionContactsResponse>(this.upoloadApiEndPoints.GetCollectionContactsForBatch, data);
  }

  uploadCollectionContacts(data: FormData){
    return this.httpService.post(this.upoloadApiEndPoints.UploadCollectionContacts, data);
  }
}
