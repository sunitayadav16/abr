import { Component, OnInit, ViewChild } from '@angular/core';
import { Messages } from '@app/core/config';
import { AdditionalNotesComponent, CommonGridComponent } from '@app/shared/components';
import { ProformaStatus } from '@core/enums';
import { ChangeProformaStatus, DeleteProformaBatch, ListRequestModel, ProformaBatchRequestModel, ProformaBatchResponseModel } from '@core/models';
import { EventService, LoaderService, ToasterService } from '@core/services';
import { ModalService } from '@shared/services';
import { InstructionModalComponent } from '..';
import { ProformaManagementService } from '../../services';
import { UploadModalComponent } from './upload-modal/upload-modal.component';

@Component({
  selector: 'app-proforma-batch-list',
  templateUrl: './proforma-batch-list.component.html',
  styleUrls: ['./proforma-batch-list.component.scss']
})
export class ProformaBatchListComponent implements OnInit {
  @ViewChild(CommonGridComponent) commonGridComponent!: CommonGridComponent;

  public readonly Message = Messages.Error;

  proformaBatchList: ProformaBatchResponseModel[] = [];
  addDisabledClass: boolean = false;
  showTooltip: boolean = false;
  currentIndex!: number;
  constructor(
    private proformaService: ProformaManagementService,
    private modalService: ModalService,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
    private eventService : EventService
  ) { }

  ngOnInit() { }


  filterGrid(request: ListRequestModel) {
    this.loaderService.showSpinner();
    this.proformaService.getProformaBatchList(request).subscribe((res: any) => {
      this.proformaBatchList = res.proformaBatchList;
      
      this.commonGridComponent.bindTable(res.proformaBatchList, res.count);
      this.loaderService.hideSpinner();
    }, error=> {
      this.loaderService.hideSpinner();
    });
  }

  onBatchStatusChange(proforma: ProformaBatchResponseModel) {
    const activationAction = this.isNewBatch(proforma) || this.isDeactivatedBatch(proforma);
    if (activationAction) {
      const index = this.proformaBatchList.findIndex((proforma) => this.isActivatedBatch(proforma));
      if (index > -1) {
        this.toasterService.warning('Only one batch can be activated at a time.')
        return;
      }
    }

    this.openStatusChangeConfirmationPopup(proforma, activationAction);
  }

  openStatusChangeConfirmationPopup(proforma: ProformaBatchResponseModel, isActivation: boolean) {
    const initialState = {
      title: proforma.proformaBatchName,
      message : this.Message.ConfirmationMessage + `${isActivation ? 'activate' : 'deactivate'} this Proforma Batch ?`
    };

    const modalRef = this.modalService.openConfirmationModal(initialState);
    modalRef.content.onClose.subscribe((res: boolean) => {
      if (res) {
        this.changeStatus(proforma.proformaBatchId, isActivation)
      }
    })
  }

  // Update Proforma Batch Status
  changeStatus(id: number, isActivation: boolean) {
    const body: ChangeProformaStatus = {
      id: id,
      status: isActivation ? ProformaStatus.Activated : ProformaStatus.Deactivated
    }
    this.addDisabledClass = true;
    this.proformaService.updateProformaBatchStatus(body).subscribe(res => {
      this.commonGridComponent.filterTable();
      this.addDisabledClass = false;
    }, error => {
      this.addDisabledClass = false;
    });
  }


  openDeleteConfirmationPopup(proforma: ProformaBatchResponseModel) {
    const isNewBatch = this.isNewBatch(proforma);
    if (!isNewBatch) {
      alert('not allowed');
      return;
    }

    const initialState = {
      title: proforma.proformaBatchName,
      message: this.Message.ConfirmationMessage + `delete this Proforma Batch ?`
    };

    const modalRef = this.modalService.openConfirmationModal(initialState);
    modalRef.content.onClose.subscribe((res: boolean) => {
      if (res) this.deleteProformaBatch(proforma.proformaBatchId);
    })
  }

  deleteProformaBatch(performaId: number) {
    const params: DeleteProformaBatch = {
      id: performaId
    };
    this.proformaService.deletePerformaBatch(params).subscribe(res => 
      // this.getProformaBatchList()
      this.commonGridComponent.filterTable()
    );
  }

  toggleBtn(index: number){
    this.currentIndex = index;
    this.showTooltip = !this.showTooltip;
  }
  

  // upload model
  openUploadModal(proformaBatchId: number) {
    const initialState = {
      id: proformaBatchId
    };
    const modalRef = this.modalService.openModal(UploadModalComponent, initialState, '');
  }


  // instruction modal
  openInstructionModal(proformaBatchId : number, instructionsName : string){
    this.proformaBatchList;
      const initialState = {
        id: proformaBatchId,
        instructions : instructionsName
      };
      const modalRef = this.modalService.openModal(InstructionModalComponent, initialState, 'modal-lg');
      modalRef.content.onClose.subscribe((res: boolean) => {
        this.eventService.loadPageGrid.next(true); // this.filterGrid( );
      });
  }


  isNewBatch = (proforma: ProformaBatchResponseModel) => proforma.proformaStatusName == ProformaStatus.New;
  isActivatedBatch = (proforma: ProformaBatchResponseModel) => proforma.proformaStatusName == ProformaStatus.Activated;
  isDeactivatedBatch = (proforma: ProformaBatchResponseModel) => proforma.proformaStatusName == ProformaStatus.Deactivated;
}