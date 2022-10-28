import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProxyUserDetails, ProxyUsersRequest, UpdateProxyUserModel } from '@app/core/models';
import { AuthService } from '@app/core/services';
import { CommonComponentService } from '@app/shared/services';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'common-mimic-user',
  templateUrl: './common-mimic-user.component.html',
  styleUrls: ['./common-mimic-user.component.scss']
})
export class CommonMimicUserComponent implements OnInit {
  @Input() id: number = 0;
  @Input() userManagement: boolean = false;

  @Output() submitted = new EventEmitter<boolean>();
  @Output() cancelled = new EventEmitter<boolean>();

  public searchBounce = new Subject<string>();

  allUserLists: ProxyUserDetails[] = [];
  proxyUserList: ProxyUserDetails[] = [];
  initalProxyUserData: ProxyUserDetails[] = [];

  constructor(
    private commonComponentService: CommonComponentService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUsersList(true);
    this.filterUserList();
  }

  getUsersList(initalFetch: boolean, searchValue: string = '') {
    let request: ProxyUsersRequest = {
      id: this.id ? this.id : this.userId,
      searchValue: searchValue
    };

    this.commonComponentService.getProxyUsersList(request).subscribe(res => {
      if (initalFetch) {
        this.proxyUserList = res.proxyUsers;
        this.initalProxyUserData = [...res.proxyUsers];
      }
      this.allUserLists = this.filterProxyUsers(res.usersList);
    })
  }


  filterUserList() {
    this.searchBounce.pipe(debounceTime(1000),distinctUntilChanged()).subscribe(value => {
      this.getUsersList(false, value);
    });
  }

  filterProxyUsers(usersList: ProxyUserDetails[]) {
    const proxyUserIds = this.proxyUserList.map(id => id.userId);
    return usersList.filter(u => proxyUserIds.indexOf(u.userId) === -1);
  }


  drop(event: CdkDragDrop<ProxyUserDetails[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }

  removeAllProxyUser(){
    this.allUserLists = this.allUserLists.concat(this.proxyUserList);
    this.proxyUserList = [];
  }

  
  saveProxyUser() {
    let params: UpdateProxyUserModel = {
      userId: this.id ? this.id : this.userId,
      userManagement: this.userManagement,
      proxyUserId: this.proxyUserIds()
    }
    this.commonComponentService.updateProxyUsers(params).subscribe(() => {
      this.proxyUserList = [];
      this.getUsersList(true);
      this.submitted.emit(true);
    })
  }

  close(){
    this.cancelled.emit(true);
  }

  proxyUserIds() {
    return this.proxyUserList.map(ur => ur.userId).join();
  }

  get hasProxyUserChanges() {
    return JSON.stringify(this.initalProxyUserData) == JSON.stringify(this.proxyUserList);
  }

  get userId() {
    return this.authService.getUserDetails().userId;
  }

}
