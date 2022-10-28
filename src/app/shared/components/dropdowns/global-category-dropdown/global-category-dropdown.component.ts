import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownCategoryId } from '@app/core/enums';
import { GlobalCode, ListRequestModel } from '@app/core/models';
import { CommonComponentService } from '@shared/services';

@Component({
  selector: 'global-category-dropdown',
  templateUrl: './global-category-dropdown.component.html',
  styleUrls: ['./global-category-dropdown.component.scss']
})
export class GlobalCategoryDropdownComponent implements OnInit {
  @Input() requestBody!: DropdownCategoryId;  
  @Input() globalCodeId: number = 0; 
  @Input() val: number;
  @Input() placeholderText: string = '';
  @Input() disabled: boolean = false;
  @Input() submitted: boolean = false;
  @Input() hasRequired: boolean = false;
  @Input() requiredMessage: string = '';

  @Output() dropdownSelectedValue : EventEmitter<number> = new EventEmitter();
  
  globalCodes: GlobalCode[] = [];

  constructor(
    private commonComponentService: CommonComponentService
  ) { }

  ngOnInit(): void {
    this.getGlobalCodes();
  }

  public getGlobalCodes(){
    const payload : ListRequestModel = {
      selectGlobalCodeId: this.globalCodeId ? this.globalCodeId : 0,
      id :this.requestBody,
      pageNumber: 1,
      pageSize: 100
    }
    this.commonComponentService.getGlobalCodes(payload).subscribe(res => {
      this.globalCodes = res.globalCodesList;
    })
  }

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.dropdownSelectedValue.emit(val);
  }


}
