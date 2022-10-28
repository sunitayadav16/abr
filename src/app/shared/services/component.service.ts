import { Injectable } from '@angular/core';
import { AdditionalNotesRequest, AddUpdateInstructionsRequest, CategoryDropdownResponse, CollectionContact, CollectionContactsRequest, CollectionContactsResponse, GlobalCodeRequest, GlobalCodeResponse, ListRequestModel, ProxyUserResponseModel, ProxyUsersRequest, UpdateProxyUserModel } from '@app/core/models';
import { ApiEndpoints } from '@core/config';
import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonComponentService {

    public readonly apiEndPoints = ApiEndpoints.Common;
    public readonly proformaApiEndPoints = ApiEndpoints.Proforma;
    public readonly proxyUserEndPoints = ApiEndpoints.ProxyUser;
    
    constructor(private httpService: HttpService){}

    getUsersAssociatedRoles(role: any): Observable<CategoryDropdownResponse[]>{
        return this.httpService.post<CategoryDropdownResponse[]>(this.apiEndPoints.UsersAssociatedRoles, role);
    }

    getGlobalCodes(data: ListRequestModel): Observable<GlobalCodeResponse>{
        return this.httpService.post<GlobalCodeResponse>(this.apiEndPoints.GetGlobalCodes, data)
    }

    getClientContacts(data: CollectionContactsRequest): Observable<CollectionContact[]>{
        return this.httpService.post<CollectionContact[]>(this.apiEndPoints.CollectionContacts, data);
    }

    updateAdditionalNotes(data: AdditionalNotesRequest){
        return this.httpService.post(this.proformaApiEndPoints.UpdateAdditionalNotes, data);
    }

    getProxyUsersList(data: ProxyUsersRequest): Observable<ProxyUserResponseModel> {
        return this.httpService.post<ProxyUserResponseModel>(this.proxyUserEndPoints.ProxyUsersList, data);
    }

    updateProxyUsers(data: UpdateProxyUserModel) {
        return this.httpService.post(this.proxyUserEndPoints.UpdateProxyUser, data);
    }


    addUpdateInstructions(data : AddUpdateInstructionsRequest ){
        return this.httpService.post(this.proformaApiEndPoints.AddUpdateInstructions, data);
    }
 
    
}