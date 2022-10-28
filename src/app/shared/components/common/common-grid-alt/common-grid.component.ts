import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnType, Grid } from '@app/core/enums';
import { AuthService, EventService } from '@app/core/services';
import { ObjectPropertyByKeyPipe } from '@app/shared/pipes';
import { ModalService } from '@app/shared/services';
import { GridColumn, IPagination, ISearching, ISorting, ListRequestModel } from '@core/models';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CellEditModalComponent } from '../..';

enum OrderByEnum {
  Ascending = 'asc',
  Descending = 'desc'
};

@Component({
  selector: 'common-grid-alt',
  templateUrl: './common-grid.component.html',
  styleUrls: ['./common-grid.component.scss'],
  providers: [ObjectPropertyByKeyPipe]
})
export class CommonGridAltComponent implements OnInit {
  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;
  @Input() public grid!: Grid;
  @Input() public columnsList: GridColumn[] = [];
  @Input() public paginationLength: number = 0;
  @Input() public orderBy: string = "";
  @Input() public tableClass: string = "";

  @Input() public hasEditPermission: boolean = false;
  @Input() public initialFirstPosition: boolean = false;
  @Input() public hideGridSearch: boolean = false;
  @Input() public isLogMode: boolean = false;
  @Input() public headerCheckbox: boolean = false;
  @Input() public selectAllCheckbox: boolean = false;
  @Input() public disableMasterCheckbox: boolean = false;
  @Input() public hideTotalRows: boolean = true;
  @Input() public hidePageNumbers: boolean = false;

  @Output() changeTable: EventEmitter<any> = new EventEmitter();
  @Output() searchValue: EventEmitter<string> = new EventEmitter();
  @Output() cellLevelDetails: EventEmitter<any> = new EventEmitter();
  @Output() showHover: EventEmitter<boolean> = new EventEmitter();
  @Output() checkAll: EventEmitter<boolean> = new EventEmitter();
  @Input() hovered: boolean = false;


  public searchBounce = new Subject<string>();

  showLoading: boolean = true;
  dataList: any[] = [];

  paginationOptions: number[] = [10, 25, 50, 100];

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

  entityKey: string = '';
  entityId: number = 0;

  onGridChangeSub: Subscription;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private authService: AuthService,
    private eventService: EventService,
    private objectPropertyByKey: ObjectPropertyByKeyPipe
  ) {
    this.onGridChangeSub = this.eventService.loadPageGrid.subscribe((value) => {
      if (value) {
        this.paginationObject.PageNo = 1;
        this.searchObject.Search = '';
        this.filterTable();
      }
    })
  }

  ngOnInit(): void {
    this.showLoading = false;
    this.sortingObject.OrderBy = this.orderBy && this.orderBy != '' ? this.orderBy : '';
    this.sortingObject.ClassName = this.sortingObject.OrderByDescending ? 'far fa-arrow-down' : 'far fa-arrow-up';

    this.filterTable();

    this.searchBounce.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => {
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
    const hasDotInString = column.indexOf(".");
    if (hasDotInString > -1) column = column.split(".")[1];

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

  changeFilter() {
    this.paginationObject.PageNo = 1;
    this.filterTable();
  }

  public bindTable(dataList: any, totalRecords: number) {
    this.showLoading = false;
    this.dataList = dataList;
    this.paginationObject.TotalItems = totalRecords;
    this.paginationObject.TotalPage = Math.ceil(totalRecords / this.paginationObject.PageSize);
  }

  openEditPopup(data: any, column: GridColumn) {
    const initialState = {
      config: {
        data: data,
        column: column
      },
    };

    const modalRef = this.modalService.openModal(CellEditModalComponent, initialState, 'column-edit modal-sm');
    modalRef.content.onClose.subscribe((res: any) => {
      modalRef.hide();
      if (res) {
        this.cellLevelDetails.emit(res);
      }
    })
  }

  public hideAdditionalColumn(column: GridColumn) {
    if (this.visibleColumns.includes(column.ColumnName)) return false;
    return column.ColumnType == ColumnType.AdditionalColumn;
  }

  getSortingColumnName(columnName: string) {
    const hasDotInString = columnName.indexOf(".");
    if (hasDotInString > -1) columnName = columnName.split(".")[1];
    return columnName;
  }

  highlightCell(column: GridColumn, index: number) {
    if (!this.isLogMode || index == 0) return false;
    const currentValue = this.objectPropertyByKey.transform(this.dataList[index], column.ColumnName);
    const previousValue = this.objectPropertyByKey.transform(this.dataList[index - 1], column.ColumnName);
    return currentValue != previousValue;
  }

  mouseOver(column: GridColumn) {
    if(!column.Hoverable) return;

    this.hovered = true;
    this.showHover.emit(true);
  }


  checkedAll(checked: boolean){
    this.checkAll.emit(checked);
  }

  onDestroy() {
    this.onGridChangeSub.unsubscribe();
  }

  get visibleColumns() {
    return this.authService.getAdditionalVisibleColumns(this.grid);
  }
}
