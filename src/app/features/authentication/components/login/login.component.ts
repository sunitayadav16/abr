import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '@core/models';
import { AppConfigService, AuthService } from '@core/services';
import { ToasterService } from '@core/services/toaster.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginRequest: LoginRequest = {};

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private appConfigService: AppConfigService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authenticationService.authenticate(this.loginRequest).subscribe(res => {
      this.getAllRolePermissions();
    });

  }

  getAllRolePermissions(){
    this.appConfigService.loadAllRolePermissions().subscribe(() => {
      this.redirect();
    }, error => {
      this.redirect();
    });
  }

  redirect() {
    const route = this.authService.getLandingPageRoute();
    this.router.navigateByUrl(route);
  }

  ngOnDestroy() { }


}
