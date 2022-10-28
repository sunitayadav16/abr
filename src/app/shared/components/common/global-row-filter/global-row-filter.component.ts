import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GlobalRowFilterModel } from '@app/core/models';

@Component({
  selector: 'global-row-filter',
  templateUrl: './global-row-filter.component.html',
  styleUrls: ['./global-row-filter.component.scss']
})
export class GlobalRowFilterComponent implements OnInit {
  @ViewChild('dropdown') dropdown!: ElementRef;
  @Input() public data!: any;
  @Input() public appliedFilters: GlobalRowFilterModel[] = [];
  @Input() public filterNames: Object = {};
  @Input() public show: boolean = false;
  @Input() public tabName: string = '';

  @Output() hide = new EventEmitter<string>();
  @Output() filteredRowData: EventEmitter<any> = new EventEmitter();

  selectedRow: GlobalRowFilterModel[] = [];

  constructor() { }

  ngOnInit(): void { 
    
  }
  
  ngOnChanges(){
    if(this.appliedFilters.length == 0) this.selectedRow = [];
  }

  getselectedValue(selectedRow: GlobalRowFilterModel[]) {
    this.selectedRow = selectedRow;
  }

  checkIfFilterIsSelected(key: string) {
    return this.appliedFilters.findIndex(k => k.key == key) > -1;
  }

  getEntityName(value: string){
    return value.replace('_', ' ').trim();
  }

  applyFilter(dropdown: any){
    const data = this.dataMapping();
    const filterData = this.selectedRow.map(({key, values}) => ({key, values}));
    this.filteredRowData.emit({requestParam: data, filtedData: filterData});
    dropdown.isOpen = false;
  }

  dataMapping() {
    const selectedData = [...this.selectedRow];
    const selectedfilterd = selectedData.map((data: any) => {
      data.arr = {
        key: data.key,
        values: data.values.join("|")
      }

      return data.arr;
    })
    return selectedfilterd;
  }

  showDropdown(){
    this.show = true;
    this.hide.emit('rowFilter');
  }

  get showAndHideListClass(){
    return this.show ? 'show' : 'd-none';
  }

}
