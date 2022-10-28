import { ValidateTokenResponse } from './../../../core/models/authentication/set-password.model';
import { ApiEndpoints } from './../../../core/config/api-endpoints.config';
import { HttpService } from '@core/services/http.service';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ForgotPasswordRequest, LoginRequest, LoginResponse, SetPasswordRequest, ChangePasswordRequest} from '@core/models';
import { AuthService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public readonly authEndpoints = ApiEndpoints.Auth;
  public readonly userEndpoints = ApiEndpoints.User;
  

  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) { }


  /* Auth Management Api methods */
  authenticate(request: LoginRequest) {
    return this.httpService.post<LoginResponse>(this.authEndpoints.Login, request).pipe(map(data => {
      // Save tokens
      this.authService.storeTokens(data.token, data.refreshToken);
      
      // Save primary role
      const primaryRole = data.roles.find(r => r.isPrimary)?.roleName ?? data.roles[0].roleName;
      this.authService.storeCurrentRole(primaryRole);
      
      // Save user details
      this.authService.setUserDetails(data);

      return data;
    }));
  }

  validateToken(token: string): Observable<ValidateTokenResponse> {
    const params = new HttpParams().set('token', `${token}`)
    return this.httpService.post(`${this.authEndpoints.ValidateToken}?${params}`, null);
  }

  setPassword(data: SetPasswordRequest): Observable<void> {
    return this.httpService.post(this.authEndpoints.SetPassword, data);
  }

  forgotPassword(data : ForgotPasswordRequest) : Observable<void>{
    return this.httpService.post(this.authEndpoints.ForgotPassword, data);
  }

  changePassword(data: ChangePasswordRequest): Observable<void> {
    return this.httpService.post(this.userEndpoints.ChangePassword, data);
  }
}
