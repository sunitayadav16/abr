import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (
      !this.authService.isAuthenticated() ||
      !this.authService.checkCurrentRoleExistInUserRoles() ||
      !this.authService.isLocalStorageSessionExist()
    ) {
      const queryParams: any = {
        redirectUrl: state.url
      };

      this.authService.clearStorage();
      this.router.navigate(['login'], { queryParams: queryParams });
      return false;
    }

    return true;
  }

}
