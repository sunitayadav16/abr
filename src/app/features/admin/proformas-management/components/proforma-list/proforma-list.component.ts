import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from '@app/core/config';
import { ProformaStatus } from '@app/core/enums';
import { LoaderService } from '@app/core/services';
import { ModalService } from '@app/shared/services';
import { DeleteProformaBatch } from '@core/models';
import { Subscription } from 'rxjs';
import { ProformaManagementService } from '../../services';

@Component({
  selector: 'app-proforma-list',
  templateUrl: './proforma-list.component.html',
  styleUrls: ['./proforma-list.component.scss']
})
export class ProformaListComponent implements OnInit {
  public readonly Message = Messages.Error;

  proformaBatchId: number = 0;
  proformaBatchName: string = '';
  proformaBatchStatus: string = '';
  proformaBatchDate: string = '';
  loadT2HourComponent: boolean = false;

  routeSubscription!: Subscription;

  constructor(
    private proformaService: ProformaManagementService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService,
    private loaderSerivce: LoaderService
  ) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.proformaBatchId = +params.proformaBatchId;
    });
  }

  proformaBatchdetails(data: any){
    this.proformaBatchStatus = data.proformaStatusName;
    this.proformaBatchDate = data.proformaBatchDate;
    this.proformaBatchName = data.proformaBatchName;
  }

  changeTab(event: any){
    this.loadT2HourComponent = event.heading == 'T2 HOURS';
  }

  openDeleteConfirmationPopup() {
    const initialState = {
      title: this.proformaBatchName,
      message: this.Message.ConfirmationMessage + ` delete this Proforma Batch ?`
    };

    const modalRef = this.modalService.openConfirmationModal(initialState);
    modalRef.content.onClose.subscribe((res: boolean) => {
      if (res) this.deleteProformaBatch(this.proformaBatchId);
    })
  }

  deleteProformaBatch(performaId: number) {
    const params: DeleteProformaBatch = {
      id: performaId
    };
    this.proformaService.deletePerformaBatch(params).subscribe(() => {
      this.router.navigateByUrl('/admin/proforma-management')
    });
  }
  
  downloadFile(){
 
    this.loaderSerivce.showSpinner();
    this.proformaService.downloadFile(this.proformaBatchId).subscribe((response: any) => {
      const { headers } = response;
      const contentDisposition = headers.get('content-disposition');
      const fileExtention = '.xlsx';
      let fileName = "ABR 2.0 " + formatDate(new Date(), 'yyyy-MMM-dd  hh:mm a', 'en-US')+fileExtention;
      let file = new Blob([response.body]);
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(file);
      downloadLink.setAttribute('download', fileName);

      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      this.loaderSerivce.hideSpinner();
    }, error => {
      this.loaderSerivce.hideSpinner();
    })
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  get isNewBatch(){
    return this.proformaBatchStatus == ProformaStatus.New;
  }
}
