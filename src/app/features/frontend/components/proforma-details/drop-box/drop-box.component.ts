import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FileTypes, Permission } from '@app/core/enums';
import { UploadedDocumentResponse } from '@app/core/models';
import { AuthService, LoaderService, ToasterService } from '@app/core/services';
import { ProformaService } from '@app/features/frontend/services';
import { ModalService } from '@app/shared/services';
import { environment } from '@env/environment';

@Component({
  selector: 'drop-box',
  templateUrl: './drop-box.component.html',
  styleUrls: ['./drop-box.component.scss']
})
export class DropBoxComponent implements OnInit {
  @ViewChild ('fileDropRef') fileDropRef: any;
  
  @Input() files: UploadedDocumentResponse[] = [];
  @Input() proformaId: number = 0;
  @Input() disabled: boolean = false;

  apiUrl = environment.baseApiUrl;
  percentage: number=0;

  constructor(
    private proformaService: ProformaService,
    private modalService: ModalService,
    private toasterService: ToasterService,
    private loaderService: LoaderService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }


  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any) { 
    this.prepareFilesList(files.target.files);
    this.fileDropRef.nativeElement.value = '';
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */

   openDeleteConfirmationPopup(file: any, index:number) {
     if(this.disabled){
       return
     }else{
      const config = {
        title: file.fileName,
        message: "Are you sure you want to delete this File ?",
      };
      const modalRef = this.modalService.openConfirmationModal(config);
      modalRef.content.onClose.subscribe((res: boolean) => {
        if (res) {
          this.deleteFile(file.fileId, index);
        }
      })
     }
  
  }

  deleteFile(id: number, index: number) {
    this.proformaService.deleteUploadedFile(id).subscribe(res => {
      this.files.splice(index, 1);
    });
    
  }


  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */

  prepareFilesList(files: any) {
    const formData = new FormData();
    formData.append('proformaId', this.proformaId.toString());
    for (var i = 0; i < files.length; i++) { 
      if(i < 5){
        formData.append("uploadFiles", files[i]);
        this.proformaService.uploadFiles(formData).subscribe((res: any) => {
          if (res.type === HttpEventType["UploadProgress"]) {
            const percentage = Math.round(
              (100 * res.loaded) / res.total
            );
            this.percentage = percentage;
          } else if (res.type === HttpEventType.Response) {
            this.files = res.body;
          }
        })
      }else{
        this.toasterService.warning('User can upload only 5 files at a time.');
      }
      
    }

  }


  downloadFile(file: UploadedDocumentResponse){
    this.loaderService.showSpinner();
    const { fileName, fileId, fileType } = file;
    this.proformaService.downloadFile(fileId).subscribe((response: any) => {
      this.loaderService.hideSpinner();
      const { headers } = response;
      const contentDisposition = headers.get('content-disposition');
      const contentType = headers.get('content-type');
      let name = `${fileName}.${fileType}`;
      let file = new Blob([response.body], { type: contentType });
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(file);
      downloadLink.setAttribute('download', name);

      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
    }, error => {
    })
  }

  fileTypeIcon(fileType: string){
    const type = fileType.split('.')[1];
    if(type == FileTypes.Doc) return "far fa-file-word";
    else if(type == FileTypes.Doc || type == FileTypes.Docx) return "far fa-file-word";
    else if(type == FileTypes.Xlsx || type == FileTypes.Xlsb) return "fal fa-file-csv";
    else if(type == FileTypes.Pdf) return "fal fa-file-pdf";
    else if(type == FileTypes.Txt) return "far fa-file-alt";
    else return "far fa-image"
  }

  get hasABRFileUploadsPermission(){
    return this.authService.getRolePermissionsNameArray().includes(Permission.ABRFileUploads);
  }

}
