import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@app/core/services';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../services/authentication.service';
import { SetPasswordRequest, ValidateTokenResponse } from './../../../../core/models';


@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  loading: boolean = true;
  validToken: boolean = false;
  setPasswordRequest: SetPasswordRequest = {};
  
  userDetails!: ValidateTokenResponse;

  queryParamSub!: Subscription;
  passwordValidations = /^(?=.*[0-9])(?=.*[!"#$%&’()*+,-.\/:;<=>?@[\]^_`{|}~]).{6,}$/ ;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.queryParamSub = this.route.queryParams.subscribe(({ token }) => {
      this.validateToken(token);
    });
  }

  validateToken(token: string) {
    this.authenticationService.validateToken(token).subscribe(data => {
      if (data) {
        this.validToken = true;
        this.userDetails = data;
        this.setPasswordRequest.userId = data.userId;
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  onSubmit() {
    const valid = (!!this.setPasswordRequest.password && !!this.setPasswordRequest.confirmPassword && this.isValidForm);

    if(!valid || this.passwordNotMatched) return;
    
    this.loaderService.showSpinner();
    this.authenticationService.setPassword(this.setPasswordRequest).subscribe(() => {
      this.loaderService.hideSpinner(); 
      this.router.navigateByUrl('');
    });
  }

  ngOnDestory() {
    this.queryParamSub.unsubscribe();
  }

  get isValidForm(){
    const value = this.setPasswordRequest.password ?? '';
    return value.match(this.passwordValidations);
  }

  get passwordNotMatched(){
    return this.setPasswordRequest.password != this.setPasswordRequest.confirmPassword;
  }
}
