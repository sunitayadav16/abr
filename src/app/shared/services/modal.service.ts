import { Injectable } from '@angular/core';
import { ConfirmationModalComponent } from '@shared/components/modals';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable()
export class ModalService {
    private modalRef!: BsModalRef;

    constructor(
        private bsModalService: BsModalService,
    ) { }


    openModal(component: any, initialState: any, modalClass: string = 'modal-md', animated: boolean = true): BsModalRef {
        this.modalRef = this.bsModalService.show(
            component, 
            {
                initialState,
                animated: animated,
                backdrop: 'static',
                class: `modal-dialog-centered ${modalClass}`
            }
        );
        return this.modalRef;
    }

    closeModal() {
        this.modalRef.hide();
    }

    
    openConfirmationModal(config: any, modalClass: string = 'modal-md', animated: boolean = true): BsModalRef {
        const initialState = {
            config: config
        };

        return this.openModal(
            ConfirmationModalComponent,
            initialState,
            modalClass,
            animated
        );
    }
}