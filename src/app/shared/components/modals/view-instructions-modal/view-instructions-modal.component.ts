import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '@app/shared/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view-instructions-modal',
  templateUrl: './view-instructions-modal.component.html',
  styleUrls: ['./view-instructions-modal.component.scss']
})
export class ViewInstructionsModalComponent implements OnInit {
  @Input() notes: string = '';

  public onClose: Subject<boolean> = new Subject();
  
  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  close(refresh: boolean = false) {  
    this.onClose.next(refresh);
  }

  // close(){
  //   this.modalService.closeModal();
  // }

}
