import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryDropdownResponse } from '@app/core/models';
import { CommonComponentService } from '@shared/services';

@Component({
  selector: 'category-dropdown',
  templateUrl: './category-dropdown.component.html',
  styleUrls: ['./category-dropdown.component.scss']
})
export class CategoryDropdownComponent implements OnInit {
  @Input() requestBody: string = '';  
  @Input() val: number = 0;
  @Input() className: string = '';
  @Input() placeholderText: string = '';
  @Output() dropdownSelectedValue : EventEmitter<number> = new EventEmitter();

  userList: CategoryDropdownResponse[] = [];

  onChange: any = () => { };
  onTouched: any = () => { };
  
  constructor(
    private commonComponentService: CommonComponentService
    ) { }

  ngOnInit(): void {
    this.getUsersAssociatedRole();
  }

  getUsersAssociatedRole(){
    this.commonComponentService.getUsersAssociatedRoles(this.requestBody).subscribe(res => {
      this.userList = res;
    })
  }

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
    this.dropdownSelectedValue.emit(val);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) { 
    this.onTouched = fn;
  }

  writeValue(value: number) {
    if (value) {
      this.value = value;
    }
  }



}
