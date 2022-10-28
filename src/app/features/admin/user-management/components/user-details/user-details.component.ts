import { Component, Input, OnInit } from '@angular/core';
import { UserModel, Role } from '@core/models';
import { AuthService } from '@core/services';
import { ModalService } from '@shared/services';
import { UserService } from '../../services/user.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() userData: UserModel = {};

  private onClose: Subject<boolean> = new Subject();

  isUpdatingUser: boolean = false;
  isFormSubmittted: boolean = false;
  loader: boolean = false;

  allUserRoles: Role[] = [];

  emailValidations: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
  disableOnFirstClick: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.allUserRoles = this.authService.getAllRoles();
    const userId = this.userData.userId ? this.userData.userId : -1;
    if (userId > -1) this.getUserRole(userId);
  }

  getUserRole(id: number) {
    
    this.userService.getUserRoleList(id).subscribe((res: any) => {
      if (res.usersList) {
        const rollArr = res.usersList[0].roleNameList;
        const allRoles: number[] = [];
        rollArr.forEach((id: any) => {
          allRoles.push(id.roleId);
          this.userData.userRoles = allRoles;
        });
      }
    })
  }

  // Save Data
  onSubmit() {
    this.userData.name = this.userData.name?.trim();
    if(!this.userData.name) return;
    
    this.disableOnFirstClick = true;
    this.loader = true;

    if (this.userData.userId) {
      
      this.userService.editUser(this.userData).subscribe(res => {
      this.loader = false;
      this.close(true);
      }, error => {
        this.loader = false;
        this.disableOnFirstClick = false;
      });
    } else {
      this.userData.userId = 0;  this.userData.isActive = true;
      this.userService.addUser(this.userData).subscribe(res => {
        this.loader = false;
        this.close(true);
      }, error => {
        this.loader = false;
        this.disableOnFirstClick = false;
      });
    }
  }

  close(refresh: boolean = false) {
    this.onClose.next(refresh);
  }

  get addClassForDropdown() {
    const length = this.userData.userRoles?.length || 0;
    return length > 5;
  }

  

}
