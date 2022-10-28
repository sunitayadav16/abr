import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';


@Injectable({
  providedIn: 'root'
})
export class RolePermissionGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const requiredPermission = route.data.requiredPermission;
    
    if (!this.authService.permissionIsGranted(requiredPermission)) {
      const route = this.authService.getLandingPageRoute();
      this.router.navigate([route]);
      return false;
    }

    return true;
  }

}
