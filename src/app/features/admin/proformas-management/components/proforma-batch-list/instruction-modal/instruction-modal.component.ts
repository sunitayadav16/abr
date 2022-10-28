import { Component, Input, OnInit } from '@angular/core';
import { AdditionalNotesRequest, AddUpdateInstructionsRequest } from '@app/core/models';
import { ModalService } from '@app/shared/services';
import { Subject } from 'rxjs';
import { ProformaManagementService } from '../../../services';

@Component({
  selector: 'app-instruction-modal',
  templateUrl: './instruction-modal.component.html',
  styleUrls: ['./instruction-modal.component.scss']
})
export class InstructionModalComponent implements OnInit {
  @Input() id: number = 0;
  @Input() instructions: string = '';
  public onClose: Subject<boolean> = new Subject();

  // instruction: string = '';

  constructor(
    private proformaService: ProformaManagementService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    
  }

  close(refresh: boolean = false) {
    this.onClose.next(refresh);
    this.modalService.closeModal();
  }

  submit(){

    const payload: AddUpdateInstructionsRequest = {
      proformaBatchId: this.id,
      instructions: this.instructions?.trim(),
    }
    this.proformaService.updateAdditionalNotes(payload).subscribe(res => {
      this.close(true);
    });
  }

}
