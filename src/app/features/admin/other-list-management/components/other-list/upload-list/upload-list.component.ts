import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownCategoryId } from '@app/core/enums';
import { LoaderService } from '@app/core/services';
import { OtherListService } from '../../../services';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss']
})
export class UploadListComponent implements OnInit {
 
  @ViewChild ('uploadLayout') uploadLayout: any;

  formData = new FormData();
  categoryName:string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private loaderService: LoaderService,
    private otherListService: OtherListService
  ) { }

  ngOnInit(): void {
    this.categoryName = this.categoryType(+this.routeParamCategoryId);
  }

  onFileSelection(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      if(+this.routeParamCategoryId == DropdownCategoryId.CollectionContactId) {
        this.formData.append('CollectionContactsFile', file);
      }else {
        this.formData.append('GlobalCodeCategoryId', this.routeParamCategoryId);
        this.formData.append('GlobalCodesFile', file);
      }
    }
  }

  submit(type: string) {
    this.loaderService.showSpinner();
    
    if(type == 'Collection contact'){
      this.uploadCollectionContacts();
      return;
    }

    this.otherListService.uploadExcelFiles(this.formData).subscribe(res => {
      this.loaderService.hideSpinner();
      this.router.navigateByUrl(`/admin/other-list-management/${this.routeParamCategoryId}`);
    }, error => {
      this.loaderService.hideSpinner();
      this.emptyUploadedFilesInput();
      this.clearFormData();
    })
  }

  uploadCollectionContacts(){
    this.otherListService.uploadCollectionContacts(this.formData).subscribe(res => {
      this.loaderService.hideSpinner();
      this.router.navigateByUrl(`/admin/other-list-management/${this.routeParamCategoryId}`);
    }, error => {
      this.loaderService.hideSpinner();
      this.emptyUploadedFilesInput();
      this.clearFormData();
    })
  }

  categoryType(category: number){
    switch(category){
      case DropdownCategoryId.ProformaLayoutId :
        this.categoryName = "Proforma layout";
        break;
      case DropdownCategoryId.WriteUpDownCategoryId :
        this.categoryName = "WU/D category";
        break;
      case DropdownCategoryId.CollectionContactId :
        this.categoryName = "Collection contact";
        break;  
      default: this.categoryName = "Advance bill category";
    }
    return this.categoryName;
  }

  clearFormData(){
    this.formData.delete("CollectionContactsFile");
    this.formData.delete("GlobalCodeCategoryId");
    this.formData.delete("GlobalCodesFile");
  }

  emptyUploadedFilesInput(){
    this.uploadLayout.nativeElement.value = '';
  }

  get routeParamCategoryId(){
    return this.route.snapshot.params.categoryId;
  }
}
