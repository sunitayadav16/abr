import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '@core/services';
import { Grid } from '@core/enums';
import { GridColumn } from '@core/models';

@Component({
  selector: 'show-hide-grid-columns',
  templateUrl: './show-hide-grid-columns.component.html',
  styleUrls: ['./show-hide-grid-columns.component.scss']
})
export class ShowHideGridColumnsComponent implements OnInit {
  @Input() grid!: Grid;
  @Input() columnsList: GridColumn[] = [];
  @Input() show: boolean = false;

  @Output() hide = new EventEmitter<string>();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  toggleVisiblity(gridColumn: GridColumn) {
    const visibleColumns = [...this.visibleColumns];
    const index = visibleColumns.findIndex(column => column == gridColumn.ColumnName);
    if (index > -1) visibleColumns.splice(index, 1);
    else visibleColumns.push(gridColumn.ColumnName);

    this.authService.storeAdditionalVisibleColumns(this.grid, visibleColumns);
  }

  showDropdown(){
    this.show = true;
    this.hide.emit('showHideDropdown');
  }

  get visibleColumns() {
    return this.authService.getAdditionalVisibleColumns(this.grid);
  }

}
