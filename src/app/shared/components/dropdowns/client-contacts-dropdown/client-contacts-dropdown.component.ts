import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CollectionContact, CollectionContactsRequest } from '@app/core/models';
import { CommonComponentService } from '@app/shared/services';

@Component({
  selector: 'client-contacts-dropdown',
  templateUrl: './client-contacts-dropdown.component.html',
  styleUrls: ['./client-contacts-dropdown.component.scss']
})
export class ClientContactsDropdownComponent implements OnInit {
  @Input() clientId: number = 0;  
  @Input() selectedClientId: number = 0;  
  @Input() val: number = 0;
  @Input() placeholderText: string = '';
  @Input() disabled: boolean = false;
  @Input() submitted: boolean = false;
  @Input() hasRequired: boolean = false;
  @Input() requiredMessage: string = '';
  
  @Output() dropdownSelectedValue : EventEmitter<number> = new EventEmitter();

  clientContacts: CollectionContact[] = [];

  constructor(
    private commonComponentService: CommonComponentService
  ) { }


  ngOnInit(): void {
    this.getClientContacts();
  }

  getClientContacts(){
    const payload: CollectionContactsRequest = {
      clientId : this.clientId,
      selectClientId: this.selectedClientId
    }
    this.commonComponentService.getClientContacts(payload).subscribe(res => {
      this.clientContacts =  res;
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
