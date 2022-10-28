import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem, Role } from '@core/models';

import { ModalService } from '@shared/services';
import { AuthService, EventService, LoaderService } from '@core/services';
import { NavigationService } from './../../services/navigation.service';

import { ChangePasswordModalComponent } from '@app/features/authentication/components';
import { SwitchCurrentRoleComponent } from '..';
import { BsComponentRef } from 'ngx-bootstrap/component-loader';
import { Subscription } from 'rxjs';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  userId : number = 0;
  menuItems: MenuItem[] = [];
  showNavbarToggler: boolean = false;
  showRoles: boolean = false;
  currentRouteIndex: number = null;

  headerSub$! : Subscription;

  @HostListener("document:click")
  clickedOut() {
    //this.currentRouteIndex = null;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private navigationService: NavigationService,
    private modalService: ModalService,
    private eventService: EventService
  ) {
      this.headerSub$ = this.eventService.loadHeaderMenu$.subscribe((load) => {
        if(load) this.buildMenuItems();
      })
  }

  ngOnInit(): void {
    this.buildMenuItems();
    this.userId = this.authService.getUserDetails().userId;
  }

  buildMenuItems() {
    this.menuItems = this.navigationService.buildUserMenuItems();
  }

  logout() {
    this.authService.logout().subscribe();
  }

  checkMenuIsActive(menuItem: MenuItem) {
    const subMenuItems = menuItem.subMenuItems || [];
    if (subMenuItems?.length == 0) return this.isRouteActive(menuItem.route);
    return subMenuItems.some(m => this.isRouteActive(m.route));
  }

  isRouteActive(route?: string) {
    const currentRoute = this.router.url.split('?')[0];
    return currentRoute.includes(route || "");
  }

  navbarToggle(){
    this.showNavbarToggler = !this.showNavbarToggler;
  }

  openChangePasswordModal() {
    this.modalService.openModal(ChangePasswordModalComponent, '', '');
  }

  openChangeCurrentRoleModal(){
    if(this.userDetails.roles.length > 1){
      this.modalService.openModal(SwitchCurrentRoleComponent , '', '');
    }else return;
    
  }
  
  dropdownClick(url: string, index: number){
    this.currentRouteIndex = index;
    if(url) this.router.navigateByUrl(url);
  }

  ngOnDestroy(){
    this.headerSub$.unsubscribe();
  }

  get userCurrentRole() {
    return this.authService.getUserCurrentRole();
  }

  get userDetails(){
    return this.authService.getUserDetails();
  }

  get userName() {
    return this.userDetails.name;
  }

  get isMimicUserSession(){
    return this.authService.isMimicUserSessionExist(); 
  }

}