import { Injectable } from '@angular/core';
import { ApiEndpoints } from '@app/core/config';
import { LoginResponse } from '@app/core/models';
import { ProfileDetailsResponseModel } from '@app/core/models/profile';
import { HttpService } from '@app/core/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProfileDetailsService {
  public readonly UserProfileDetailsEndpoints = ApiEndpoints.ProfileDetails;
  public readonly proxyUserEndPoints = ApiEndpoints.ProxyUser;

  constructor(
    private httpService: HttpService,
    ) { }
  
  getProfileDetailsData(userId : number): Observable<ProfileDetailsResponseModel> {
    return this.httpService.post<ProfileDetailsResponseModel>(this.UserProfileDetailsEndpoints.UserDetails, {id : userId});
  }

  updateProfileDetails(data: any){
    return this.httpService.post(this.UserProfileDetailsEndpoints.UpdateUserDetails, data);
  }

  setPrimaryRole(data : any ){
    return this.httpService.post(this.UserProfileDetailsEndpoints.SetPrimaryRole , data)
  }

  getAvailableMimic(userId : number){
    return this.httpService.post(this.proxyUserEndPoints.AvailableMimicingUser, {id : userId});
}

}
