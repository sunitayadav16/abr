import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropdownCategoryId } from '@app/core/enums';
import { GlobalCodeRequest, GlobalCodeResponse, GridColumn, ListRequestModel } from '@app/core/models';
import { AuthService, EventService, LoaderService } from '@app/core/services';
import { CommonGridAltComponent } from '@app/shared/components';
import { Subscription } from 'rxjs';
import { OtherListService } from '../../services';

@Component({
  selector: 'app-other-list',
  templateUrl: './other-list.component.html',
  styleUrls: ['./other-list.component.scss']
})
export class OtherListComponent implements OnInit {
  @ViewChild(CommonGridAltComponent) CommonGridAltComponent!: CommonGridAltComponent;
  selected: any;

  constructor(
    private otherListService: OtherListService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private eventService: EventService
  ) { }

  categoryId: number = 0;
  categoryName: string = '';
  filteredCategoryList : GlobalCodeResponse[] = [];
  isCollectionContactList: boolean = false;
  loading: boolean = false;

  columnsList : GridColumn[] =[
    {
      ColumnName: "globalCodeId",
      DisplayName: "Id",
      AllowSorting: true,
    }, 
    {
      ColumnName: "globalCodeName",
      DisplayName: "Name",
      AllowSorting: true,
    }
  ] 

  collectionContactColumnsList : GridColumn[] =[
    {
      ColumnName: "clientId",
      DisplayName: "Collection Contact Id",
      AllowSorting: true,
    }, 
    {
      ColumnName: "clientName",
      DisplayName: "Client Name",
      AllowSorting: true,
    }, 
    {
      ColumnName: "clientContactName",
      DisplayName: "Client Contact Name",
      AllowSorting: true,
    }
  ] 

  checkApiCalls: number = 0;

  routeSubscription!: Subscription;

  ngOnInit(): void {

    this.routeSubscription = this.route.params.subscribe(param => {
      this.categoryId = +param.categoryId;
      this.categoryType(this.categoryId);
      this.loading = true;
      if(this.categoryId == DropdownCategoryId.CollectionContactId){
  
        this.isCollectionContactList = true;
        this.eventService.loadPageGrid.next(true);
      }else{
        this.isCollectionContactList = false;
        this.eventService.loadPageGrid.next(true);
      }
    })
  }



  filterGrid(request: ListRequestModel){
    request.id = this.categoryId;
    this.checkApiCalls ++;
    this.loaderService.showSpinner();
    if(this.isCollectionContactList){
      this.getCollectionContactsList(request);
    }else{
      if(this.checkApiCalls > 1) return;

      this.otherListService.getGlobalCodes(request).subscribe(res => {
        this.loaderService.hideSpinner();
        this.CommonGridAltComponent.bindTable(res.globalCodesList, res.totalRows);
        this.checkApiCalls = 0;
    }, error => {
        this.loaderService.hideSpinner();
      })
    }
    
  }

  getCollectionContactsList(request: ListRequestModel){
    if(this.checkApiCalls > 1) return;
    
    this.otherListService.getCollectionContact(request).subscribe(res => {
      this.loaderService.hideSpinner();
      this.CommonGridAltComponent.bindTable(res.clientContactsList, res.rowsCount);
      this.checkApiCalls = 0;
    }, error => {
      this.loaderService.hideSpinner();
    })
  }

  categoryType(category: number){
    switch(category){
      case DropdownCategoryId.ProformaLayoutId :
        this.categoryName = "Proforma Layouts";
        break;
      case DropdownCategoryId.WriteUpDownCategoryId :
        this.categoryName = "WU/D Categories";
        break;
      case DropdownCategoryId.CollectionContactId :
        this.categoryName = "Collection Contacts";
        break;  
      default: this.categoryName = "New Advance Bill Category";
    }
    return this.categoryName;
  }
  
  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
  }


}
