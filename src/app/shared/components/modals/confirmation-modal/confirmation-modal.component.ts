import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalService } from '@shared/services';

interface ConfirmationModalConfig {
  title: string;
  message: string;
  icon: string;
}

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() config!: ConfirmationModalConfig;

  public onClose!: Subject<boolean>;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  delete() {
    this.onClose.next(true);
    this.modalService.closeModal();
  }

  close() {
    this.onClose.next(false);
    this.modalService.closeModal();
  }

}
