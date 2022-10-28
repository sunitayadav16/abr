import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModalService } from '@shared/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.scss']
})
export class BaseModalComponent implements OnInit {

  @Input() public modalTitle: string = "";
  @Input() public modalClass: string = "";

  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.onSave.emit();
  }

  close() {
    this.onClose.next();
  }

}
