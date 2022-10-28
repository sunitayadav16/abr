import { Component, OnInit } from '@angular/core';
import { ChangePasswordRequest } from '@app/core/models';
import { AuthService, LoaderService } from '@app/core/services';
import { ModalService } from '@app/shared/services';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit {

  changePasswordRequest: ChangePasswordRequest = {};
  loader: boolean = false;
  passwordValidations = /^(?=.*[0-9])(?=.*[!"#$%&’()*+,-.\/:;<=>?@[\]^_`{|}~]).{6,}$/ ;
  submitted : boolean = false;
  constructor(
    private modalService: ModalService,
    private loaderService: LoaderService,
    private authenticationService: AuthenticationService,
    private authService: AuthService 
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.submitted = true;
    const valid = (!!this.changePasswordRequest.oldPassword && !!this.changePasswordRequest.newPassword && !!this.changePasswordRequest.confirmPassword && this.isValidPatteren);
    if(!valid || this.passwordNotMatched) return;

    this.changePasswordRequest.userId = this.userId;
    this.loaderService.showSpinner();
    this.authenticationService.changePassword(this.changePasswordRequest).subscribe(() => {
      this.loaderService.hideSpinner(); 
      this.modalService.closeModal();
    }, error => {
      this.loaderService.hideSpinner(); 
    });
  }

  close(){
    this.modalService.closeModal();
  }

  get isValidPatteren(){
    const value = this.changePasswordRequest.newPassword ?? '';
    return value.match(this.passwordValidations);
  }

  get userId() {
    return this.authService.getUserDetails().userId;
  }

  get passwordNotMatched(){
    return this.changePasswordRequest.newPassword != this.changePasswordRequest.confirmPassword;
  }

}
