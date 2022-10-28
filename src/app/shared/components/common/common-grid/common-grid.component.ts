import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnType, Grid } from '@app/core/enums';
import { AuthService, EventService } from '@app/core/services';
import { GridColumn, IPagination, ISearching, ISorting, ListRequestModel } from '@core/models';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

enum OrderByEnum {
  Ascending = 'asc',
  Descending = 'desc'
};

@Component({
  selector: 'common-grid',
  templateUrl: './common-grid.component.html',
  styleUrls: ['./common-grid.component.scss']
})
export class CommonGridComponent implements OnInit {
  @Input() public grid!: Grid;
  @Input() public columnsList: any = [];
  @Input() public paginationLength: number = 0;
  @Input() public orderBy: string = "";
  @Input() public tableClass: string = "";
  @Input() public tableBodyClass: string = "";
  @Input() public hideGridSearch: boolean = false;


  @Output() changeTable: EventEmitter<any> = new EventEmitter();
  @Output() searchValue : EventEmitter<string> = new EventEmitter();
  
  public searchBounce = new Subject<string>();

  showLoading: boolean = true;
  dataList: any[] = [];

  paginationOptions: number[]= [10, 25, 50, 100];

  searchObject: ISearching = {
    Search: ''
  };

  paginationObject: IPagination = {
    PageNo: 1,
    PageSize: 10,
    MaxSize: 5,
    TotalPage: 0,
    TotalItems: 0
  };

  sortingObject: ISorting = {
    OrderBy: "",
    OrderByDescending: false,
    ClassName: "fa-arrow-up"
  };

  roleChangeSub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private eventService: EventService
  ) {

    this.roleChangeSub = this.eventService.loadPageGrid.subscribe((value) => {
      if(value){
        this.filterTable();
      }
    })
   }

  ngOnInit(): void {
    this.showLoading = false;
    this.sortingObject.OrderBy = this.orderBy && this.orderBy != ''? this.orderBy: '';
    this.sortingObject.ClassName = this.sortingObject.OrderByDescending ? 'far fa-arrow-down': 'far fa-arrow-up';
    
    this.filterTable();

    this.searchBounce.pipe(debounceTime(1000),distinctUntilChanged()).subscribe(() => {
      this.changeFilter();
    });
  }


  public filterTable() {
    let requesetPayload: ListRequestModel = {
      id: -1,
      pageNumber: this.paginationObject.PageNo,
      pageSize: Number(this.paginationObject.PageSize),
      sortColumn: this.sortingObject.OrderBy,
      sortOrder: this.sortingObject.OrderByDescending ? OrderByEnum.Descending : OrderByEnum.Ascending,
      searchValue: this.searchObject.Search.trim(),
    };
    this.changeTable.emit(requesetPayload);
    this.searchValue.emit(this.searchObject.Search.trim());
  }

  changeSorting(column: any) {
    var sort = { ...this.sortingObject };

    if (sort.OrderBy == column) {
      sort.OrderByDescending = !sort.OrderByDescending;
    } else {
      sort.OrderBy = column;
      sort.OrderByDescending = false;
    }
    sort.ClassName = sort.OrderByDescending ? "far fa-arrow-down" : "far fa-arrow-up";

    this.sortingObject = sort;

    this.filterTable();
  }

  pageChanged(event: any) {
    this.paginationObject.PageNo = event.page;
    this.filterTable();
  }

  changeFilter(){
    this.paginationObject.PageNo = 1;
    this.filterTable();
  }

  public bindTable(dataList: any, totalRecords: number) {
    this.showLoading = false;
    this.dataList = dataList;
    this.paginationObject.TotalItems = totalRecords;
    this.paginationObject.TotalPage = Math.ceil(totalRecords / this.paginationObject.PageSize);
  }

  public hideAdditionalColumn(column: GridColumn) {
    if (this.visibleColumns.includes(column.ColumnName)) return false;
    return column.ColumnType == ColumnType.AdditionalColumn;
  }

  ngOnDestroy(){
    this.roleChangeSub.unsubscribe();
  }

  get visibleColumns() {
    return this.authService.getAdditionalVisibleColumns(this.grid);
  }

}
