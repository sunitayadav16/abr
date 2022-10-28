import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ProxyUserDetails, ProxyUsersRequest, UpdateProxyUserModel } from '@core/models';
import { ModalService } from '@shared/services';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-mimic-user',
  templateUrl: './mimic-user.component.html',
  styleUrls: ['./mimic-user.component.scss']
})

export class MimicUserComponent implements OnInit {
  @Input() id: number = 0;
  public onClose: Subject<boolean> = new Subject();

  constructor(
    public modalService: ModalService,
    private userService: UserService,
  ) {

  }

  ngOnInit(): void {}

  saveProxyUser(proxyUserSubmitted: boolean = false) {
    if(proxyUserSubmitted) this.close(proxyUserSubmitted);
  }

  close(refresh: boolean = false) {
    this.onClose.next(refresh);
    this.modalService.closeModal();
  }

}
