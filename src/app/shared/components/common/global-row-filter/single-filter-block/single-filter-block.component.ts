import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalRowFilterModel, RowFilterObject } from '@app/core/models';

@Component({
  selector: 'single-filter-block',
  templateUrl: './single-filter-block.component.html',
  styleUrls: ['./single-filter-block.component.scss'],
})
export class SingleFilterBlockComponent implements OnInit {
  @Input() show: boolean = false;
  @Input() data: RowFilterObject[] = [];
  @Input() key: string = "";
  @Input() id: string = "";
  @Input() public selectedFilters: GlobalRowFilterModel[] = [];

  @Output() selectedValues: EventEmitter<GlobalRowFilterModel[]> = new EventEmitter();

  selectedRow: GlobalRowFilterModel[] = [];
  filteredValue: RowFilterObject[] = [];
  checkExistingValue: string[]= [];
  search: string = '';
  
  constructor(
  ) { }

  ngOnInit(): void {
    this.filteredValue = this.data;
    this.selectedRow = this.selectedFilters;
  }

  ngOnChanges(){
    this.filteredValue = this.data;
    this.selectedRow = this.selectedFilters;
    this.search = '';
    if(this.selectedRow.length == 0) this.checkExistingValue = [];
    
    if(!this.show) this.unCheckSelectedValue();
  }

  unCheckSelectedValue(){
    const index = this.selectedFilters.findIndex(k => k.key == this.key);
    if(index > -1) this.selectedFilters.splice(index, 1); 
  }
    
  checkIfFilterIsSelected(key: string, id:any) {
    const selection = this.selectedRow.find(k => k.key == key);
    return selection?.values.includes(id);
  }

  filterItem() {
    let searchValue = this.search.trim();
    const value = JSON.parse(JSON.stringify(this.data));

    if (!searchValue) {
      this.filteredValue = value;
      return;
    }

    const searchedList = value.filter((element: RowFilterObject) => {
      const name = element.name.toLowerCase();
      return name.includes(searchValue.toLocaleLowerCase());
    });
    this.filteredValue = [...searchedList];
  }

  selectValue(value: string, id: any, checked: boolean) {
    
    if(checked){
      if(this.checkExistingValue.includes(this.key)){
        const index = this.selectedRow.findIndex(k => k.key == this.key);
        if(index > -1) this.selectedRow[index].values.push(id);
      }else{
        this.checkExistingValue.push(this.key);
        this.selectedRow.push({
          key: this.key,
          values: [id]
        });
      }
    }else{
      const index = this.selectedRow.findIndex(k => k.key == this.key);
      const existArrIndex = this.checkExistingValue.findIndex(k => k == this.key);
      if(index > -1){
        if(this.selectedRow[index].values.length > 1){
          const deleteIndex = this.selectedRow[index].values.findIndex(n => n == id);
          if(deleteIndex > -1) this.selectedRow[index].values.splice(deleteIndex, 1);
        }else{
          this.selectedRow.splice(index, 1);
          if(existArrIndex > -1)this.checkExistingValue.splice(existArrIndex, 1);
        }
      }
    }
    
    this.selectedValues.emit(this.selectedRow);
    
  }

}
