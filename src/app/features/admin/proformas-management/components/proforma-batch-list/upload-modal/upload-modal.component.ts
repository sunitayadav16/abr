import { Component, Input, OnInit } from '@angular/core';
import { Messages } from '@app/core/config';
import { ToasterService } from '@app/core/services';
import { ModalService } from '@shared/services';
import { Subject } from 'rxjs';
import { ProformaManagementService } from '../../../services';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements OnInit {
  @Input() id: number = 0;
  public onClose: Subject<boolean> = new Subject();
  public readonly Message = Messages.Error;

  advancebackgroundColor: boolean = true;
  commissionbackgroundColor: boolean = true;
  loader: boolean = false;

  formData = new FormData();

  storeUplodedFiles: any[] = [];
  isOpenAirInput: boolean = false; 
  checkIdentifyNumber: number = 0;

  constructor(
    public modalService: ModalService,
    private proformaService: ProformaManagementService,
    private toasterService: ToasterService
  ) { }


  ngOnInit() {
  }

  close(refresh: boolean = false) {
    this.onClose.next(refresh);
    this.modalService.closeModal();
  }

  onChange(event: any, identifyNumber: number): void {
    this.checkIdentifyNumber = identifyNumber;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.storeUplodedFiles.push(file.name);
      this.formData.append('ProformaBatchId', this.id.toString())
      if(identifyNumber == 0){
        this.formData.append('AdvanceBillsFile', file);
      }else if(identifyNumber == 1){
        this.formData.append('CommissionsFile', file);
      }else{
        this.formData.append('OpenAirStatusFile', file);
        
      }
    }
  }

  uploadAdvanceCommission() {
    if(this.storeUplodedFiles.length == 0){
      return this.toasterService.error(this.Message.AtleastOneUpload);
    }
    if(this.isOpenAirInput){
      this.uploadOpenAirStatus(this.formData);
      return
    } 

    this.loader = true;
    this.proformaService.uploadAdvanceCommissions(this.formData).subscribe(res => {
      this.loader = false;
      this.close();
    }, error => {
      this.loader = false;
      this.clearFormData();
    })
  }

  uploadOpenAirStatus(data: FormData){
    if(this.checkIdentifyNumber != 2) return;

    this.loader = true;
    this.proformaService.uploadOpenAirStatus(data).subscribe(res => {
      this.loader = false;
      this.close();
    }, error => {
      this.loader = false;
      this.clearFormData();
    })
  }

  showOpenAirInput(value: string){
    this.isOpenAirInput = value == 'openAir' ? true : false;
  }

  clearFormData(){
    this.formData.delete("ProformaBatchId");
    this.formData.delete("AdvanceBillsFile");
    this.formData.delete("CommissionsFile");
    this.formData.delete("OpenAirStatusFile");
  }

}
