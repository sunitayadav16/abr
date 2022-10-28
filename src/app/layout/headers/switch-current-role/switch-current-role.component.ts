import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '@app/core/models';
import { ProfileDetailsResponseModel, ProfileModel } from '@app/core/models/profile';
import { AuthService, EventService } from '@app/core/services';
import { ModalService } from '@app/shared/services';

@Component({
  selector: 'app-switch-current-role',
  templateUrl: './switch-current-role.component.html',
  styleUrls: ['./switch-current-role.component.scss']
})
export class SwitchCurrentRoleComponent implements OnInit {

  selectedDevice : any;

  currentRole: Role = { roleId:0, roleName: "" };
  roleArr: Role[] = []; 
  constructor(private modalService: ModalService, 
    private authService: AuthService,
    private eventService: EventService,
    private router: Router) { }

  ngOnInit(): void {
    this.roleArr = this.userAllRoles;
    this.roleArr.forEach((id: Role) => {
      if(id.roleName == this.userCurrentRole) this.currentRole.roleId = id.roleId;
    });
  }

  close(){
    this.modalService.closeModal();
  }

  selectedRole(event: any, rolename : string){
    this.roleArr.forEach((role: Role) => {
      if(role.roleId == event.target.value) this.currentRole = role;
    });
    
  }

  switchRole(){
    debugger
    if(this.currentRole.roleName == '' || (this.userCurrentRole == this.currentRole.roleName))
    {
      this.close(); return;
    }
  
    this.authService.switchRole(this.currentRole).subscribe(res => {
      this.router.navigateByUrl('/home');
      this.eventService.loadPageGrid.next(true);
      this.eventService.loadHeaderMenu.next(true);
      this.close();
    }, error=>{
    });
  }

  get userCurrentRole() {
    return this.authService.getUserCurrentRole();
  }

  get userDetails(){
    return this.authService.getUserDetails();
  }

  get userAllRoles() {
    return this.userDetails.roles;
  }

}
