import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Grid, Permission } from '@app/core/enums';
import { GridColumn, ProxyUserDetails, UserRole } from '@app/core/models';
import { ProfileDetailsResponseModel, ProfileModel } from '@app/core/models/profile';
import { AuthService, LoaderService, UtilityService } from '@app/core/services';
import { CommonGridAltComponent } from '@app/shared/components';
import { CommonMimicUserComponent } from '@app/shared/components/common/common-mimic-user/common-mimic-user.component';
import { ProfileDetailsService } from '../../services/profile-details.service';


@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  @ViewChild(CommonMimicUserComponent) commonMimicUserComponent!: CommonMimicUserComponent;
  @ViewChild(CommonGridAltComponent) commonGridComponent!: CommonGridAltComponent;
  @Input() submitted: boolean = false;

  profileData: ProfileDetailsResponseModel = {};
  grid: Grid = Grid.ProxyUsersListGrid;

  // nameValidations: string = '^[a-zA-Z][a-zA-Z\\s]+$';
  userId: number = 0;
  allUserRoles: any = [];
  roleId: number = 0;
  rollArr: any = [];
  proxyUserList: ProxyUserDetails[] = [];

  constructor(
    private profileService: ProfileDetailsService,
    private loaderService: LoaderService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
  ) { }

  columnsList: GridColumn[] = [
    {
      ColumnName: "employeeId",
      DisplayName: "WIN ID",
      AllowSorting: false,
    },
    {
      ColumnName: "name",
      DisplayName: "Employee Name",
      AllowSorting: false,
    },
    {
      ColumnName: "",
      DisplayName: "Action",
      AllowSorting: false,

    }
  ];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params.id;
    });
    this.getUserDetails(this.userId);
    this.getAvailableMimicing(this.userId);
  }

  getUserDetails(id: number) {
    this.profileService.getProfileDetailsData(id).subscribe((res) => {
      if(res){
        this.profileData = res;
        this.allUserRoles = this.profileData.roles;
        this.rollArr = this.profileData.roles;
        this.assignUserDetailToLocalStorage();
        this.allUserRoles?.forEach((id: any) => {
          if (id.isPrimary) {
            this.roleId = id.roleId;
            this.profileData.roles = id.roleId;
          }
        });
      }else return;
     
    })
  }

  getAvailableMimicing(userId : number){
    this.profileService.getAvailableMimic(userId).subscribe((res: any) =>{
      if(res.usersList.length > 0) {
      this.commonGridComponent.bindTable(res.usersList, 0);
      } else return;
    });
  }

  onSubmit() {
    let payload: ProfileModel = {
      userId: this.profileData.userId,
      employeeId: (this.profileData?.employeeId) ? this.profileData.employeeId : null,
      name: this.profileData.name,
      email: this.profileData.email,
      roleId: this.roleId,
    }
    this.loaderService.showSpinner();

    this.profileService.updateProfileDetails(payload).subscribe(res => {  
      this.getUserDetails(this.userId);
      this.loaderService.hideSpinner();
    }, error => {
      this.loaderService.hideSpinner();
    })
  }

  assignUserDetailToLocalStorage(){
    const previousUserDetails = this.userDetails;
    const { name, email, roles } = this.profileData;
    previousUserDetails.name = name;
    previousUserDetails.roles = roles;
    previousUserDetails.email = email;
    this.authService.setUserDetails(previousUserDetails);
  }

  launchMimicUser(userId: number) {
    const id = this.utilityService.decrypt(userId.toString());
    const splitUrl = window.location.href.split('/')[3];
    const url = splitUrl == 'profile' ? `/home?sessionKey=${id}` : `/${splitUrl}/home?sessionKey=${id}`
    window.open(url);
  }

  get addClassForDropdown() {
    const length = this.profileData.roles?.length || 0;
    return length > 5;
  }

  get userDetails(){
    return this.authService.getUserDetails();
  }

  get hasProxyAssignmentPermission(){
    return this.authService.getRolePermissionsNameArray().includes(Permission.ProxyAssignments);
  }

  get hasAblityToProxyPermission(){
    return this.authService.getRolePermissionsNameArray().includes(Permission.AbilityToProxy);
  }

}
