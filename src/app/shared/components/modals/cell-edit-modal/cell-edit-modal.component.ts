import { GridColumn } from '@core/models';
import { Component, Input, OnInit } from '@angular/core';
import { FormControlType } from '@app/core/enums';
import { CellEditRequest } from '@app/core/models';
import { ObjectPropertyByKeyPipe } from '@app/shared/pipes';
import { ModalService } from '@shared/services';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cell-edit-modal',
  templateUrl: './cell-edit-modal.component.html',
  styleUrls: ['./cell-edit-modal.component.scss'],
  providers: [ObjectPropertyByKeyPipe, DatePipe]
})
export class CellEditModalComponent implements OnInit {
  @Input() config: any;
  
  public onClose: Subject<any> = new Subject();

  value: any = '';
  valueId: number = 0;
  entityKeyId: number = 0;
  maxDate: Date = new Date();
  selectedDate: Date = new Date();
  previousValue: string = '';

  constructor(
    private modalService: ModalService,
    private objectPropertyByKeyPipe: ObjectPropertyByKeyPipe,
    private datePipe: DatePipe
  ) {
   }

  ngOnInit(): void {
    this.value = this.cellValue(this.column.ColumnName);
    this.valueId = this.cellValueId(this.column.RowIdKey);
    this.entityKeyId = this.getEntityId(this.column.EntityIdKey);
    if(this.isTypeInputDate) this.selectedDate = new Date(this.value);

    this.previousValue = this.value;
  }

  cellValue(key: any) {
    if (!key) return null;
    return this.objectPropertyByKeyPipe.transform(this.data, key);
  }

  cellValueId(key: any) {
    if (!key) return null;
    return this.objectPropertyByKeyPipe.transform(this.data, key);
  }

  getEntityId(key: any){
    if (!key) return null;
    return this.objectPropertyByKeyPipe.transform(this.data, key);
  }

  close(refresh: any = false) {
    this.onClose.next(refresh);
  }

  submit() {
    const required = this.isTypeInputText || this.isTypeInputNumber || this.isTypeDropdown || this.isTypeInputDate ? true : false;
    if(this.isTypeInputDate) {
      this.previousValue = this.previousValue.split('T')[0];
      this.value = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd') || "";
    }

    if(required) {
      if(!this.formIsValid){
        return;
      }
    }
    if(this.previousValue == this.value) return;
  
    const split = (this.column.RowIdKey).split(".");
    let columnName = this.column.ColumnName.split(".")[1];
    if(this.isTypeDropdown) columnName = this.column.RowIdKey.split(".")[1];

    const request: CellEditRequest = {
      id: this.entityKeyId, 
      entity: split[0], 
      value: this.value?.trim(), 
      columnName: columnName
    };
    this.onClose.next(request);
    this.modalService.closeModal();
  }

  getDropdownValue(value: number){
    if(value && value != 0) this.value = value;
  }

  get data() {
    return this.config.data;
  }

  get column() {
    return this.config.column;
  }

  get formIsValid() {
    return !this.isRequiredError;
  }

  get isRequiredError() {
    let trimValue = this.value == '' && this.value != 0 ;
    if(!this.isTypeInputNumber && this.value) trimValue = this.value.trim() == '';
    return trimValue;
  }

  get dropdownValue() {
    return this.cellValue(this.column.DropdownSelectionKey || "")
  }

  get inputLabel() {
    return this.column.DisplayName;
  }

  get isTypeInputText() {
    return this.column.FormControlType == FormControlType.InputText;
  }

  get isTypeInputNumber() {
    return this.column.FormControlType == FormControlType.InputNumber;
  }

  get isTypeDropdown() {
    return this.column.FormControlType == FormControlType.Dropdown;
  }

  get isTypeTextarea() {
    return this.column.FormControlType == FormControlType.TextArea;
  }

  get isTypeInputDate() {
    return this.column.FormControlType == FormControlType.InputDate;
  }

  get hasRequestBody() {
    return this.column.RequestBody;
  }
}
