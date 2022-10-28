import { Component, OnInit } from '@angular/core';
import { ForgotPasswordRequest } from '@app/core/models';
import { AppConfigService, LoaderService } from '@app/core/services';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgotPasswordRequest: ForgotPasswordRequest = {};

  constructor(
    private authenticationService: AuthenticationService,
    private appConfigService: AppConfigService,
    private loaderService : LoaderService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.loaderService.showSpinner();
    this.authenticationService.forgotPassword(this.forgotPasswordRequest).subscribe(res =>{
      this.loaderService.hideSpinner();
      this.getAllRolePermissions();  
    },error => {
      this.loaderService.hideSpinner();
    });
  }

  getAllRolePermissions(){
    this.appConfigService.loadAllRolePermissions().subscribe();
  }

  ngOnDestroy() { }

}
