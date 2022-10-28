import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Messages } from '@app/core/config';
import { AuthService, LoaderService, ToasterService } from '@core/services';
import { ProformaManagementService } from '../../services';


@Component({
  selector: 'app-upload-batch',
  templateUrl: './upload-batch.component.html',
  styleUrls: ['./upload-batch.component.scss']
})
export class UploadBatchComponent implements OnInit {
  @ViewChild ('performUpload') performUpload: any;
  @ViewChild ('t2HourUpload') t2HourUpload: any;

  public readonly Message = Messages.Error;

  selectMonthView: boolean = true;
  uploadView: boolean = false;

  userName: string = '';
  batchDate: Date = new Date();
  maxDate:  Date = new Date();
  
  storeUplodedFiles: any[] = [];
  formData = new FormData();

  constructor(
    private authService: AuthService,
    private proformaService: ProformaManagementService,
    private router: Router,
    private datePipe: DatePipe,
    private loaderService: LoaderService,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetails();
    this.userName = userDetails.firstName;
  }


  selectproformaDate(date: any) {
    date.monthSelectHandler = (event: any): void => {
      date._store.dispatch(date._actions.select(event.date));
    };
    date.setViewMode('month');
  }

  showUploadView() {
    const date = this.datePipe.transform(this.batchDate, 'yyyy-MM-01') || "";
    this.proformaService.performaVerification(date).subscribe(res => {
      this.uploadView = res.isExist ? false : true;
      this.selectMonthView = res.isExist ? true : false;
    })
  }

  onFileSelection(event: any, isPerformaFile: boolean = true): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.storeUplodedFiles.push(file.name);
      if (isPerformaFile) {
        this.formData.append('proformaFile', file);
      } else {
        this.formData.append('t2HoursFile', file);
      }
    }
  }

  submit() {
    if (this.storeUplodedFiles.length <= 1) {
      return this.toasterService.error(this.Message.ProformaUploadConfirmationMessage);
    };

    this.loaderService.showSpinner();
    const date = this.datePipe.transform(this.batchDate, 'yyyy-MM-01') || "";
    this.formData.append('Date', date);

    this.proformaService.uploadproformaBatch(this.formData).subscribe(res => {
      this.loaderService.hideSpinner();
      this.router.navigateByUrl('/admin/proforma-management');
    }, error => {
      this.loaderService.hideSpinner();
      this.emptyUploadedFilesInput();
      this.clearFormData();
    })
  }

  goBack() {
    this.uploadView = false;
    this.selectMonthView = true;
  }

  emptyUploadedFilesInput(){
    this.performUpload.nativeElement.value = '';
    this.t2HourUpload.nativeElement.value = '';
  }

  clearFormData(){
    this.formData.delete("Date");
    this.formData.delete("proformaFile");
    this.formData.delete("t2HoursFile");
  }
}

