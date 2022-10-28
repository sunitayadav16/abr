import { Component, OnInit, ViewChild } from '@angular/core';
import { Permission } from '@core/enums';
import { ChangeUserStatus, DeleteUser, GridColumn, ListRequestModel, UserModel } from '@core/models';
import { AuthService, LoaderService } from '@core/services';
import { ModalService } from '@shared/services';
import { CommonGridComponent } from '@shared/components';
import { UserService } from '../../services/user.service';
import { MimicUserComponent } from '../mimic-user/mimic-user.component';
import { UserDetailsComponent } from '../user-details/user-details.component';




@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnInit {
  @ViewChild(CommonGridComponent) commonGridComponent!: CommonGridComponent;

  usersList: any[] = [];
  columnsList: GridColumn[] = this.userService.getUserColumnHeaders();

  userData!: UserModel;

  hasProxyAssignmentPermission: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private loaderService: LoaderService,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.hasProxyAssignmentPermission = this.authService.permissionIsGranted(this.proxyAssignmentPermission);
    if (!this.proxyAssignmentPermission) this.columnsList = this.columnsList.filter(c => !!c.ColumnName);
  }

  filterGrid(request: ListRequestModel) {
    this.loaderService.showSpinner();
    this.userService.getUserList(request).subscribe(res => {
      this.usersList = res.usersList;
      this.commonGridComponent.bindTable(res.usersList, res.totalRows);
      this.loaderService.hideSpinner();
    }, error => {
      this.loaderService.hideSpinner();
    });
  }

  openDeleteUserConfirmationPopup(data: any) {
    const config = {
      title: data.name,
      message: "Are you sure you want to delete this User ?",
      icon: 'fa-user'
    };
    const modalRef = this.modalService.openConfirmationModal(config);
    modalRef.content.onClose.subscribe((res: boolean) => {
      if (res) {
        this.deleteUser(data.userId);
      }
    })
  }

  deleteUser(userId: number) {
    let params: DeleteUser = {
      id: userId
    }
    this.userService.deleteUser(params).subscribe(res => {
      this.commonGridComponent.filterTable();
    });
  }

  changeStatus(id: number, checkboxStatus: boolean) {
    let parmas: ChangeUserStatus = {
      id: id,
      isActive: !checkboxStatus
    }
    this.userService.changeStatus(parmas).subscribe(() => {
      this.commonGridComponent.filterTable();
    });
    
  }

  openUserDetailsPopup() {
    const initialState = {
      userData: this.userData
    };

    const modalRef: any = this.modalService.openModal(UserDetailsComponent, initialState);
    modalRef.content.onClose.subscribe((refresh: boolean) => {
      modalRef.hide();
      if (refresh) this.commonGridComponent.filterTable();
    })
  }

  createUser() {
    this.userData = {};
    this.openUserDetailsPopup();
  }

  editUser(data: UserModel) {
    this.userData = { ...data };
    this.openUserDetailsPopup();
  }

  openMimicUserPopup(userId: number) {
    const initialState = {
      id: userId
    };
    const modalRef = this.modalService.openModal(MimicUserComponent, initialState, 'mimic-user');
  }

  get proxyAssignmentPermission() {
    return Permission.ProxyAssignments;
  }

}
