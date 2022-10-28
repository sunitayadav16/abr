import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContactsDropdownComponent } from './client-contacts-dropdown.component';

describe('ClientContactsDropdownComponent', () => {
  let component: ClientContactsDropdownComponent;
  let fixture: ComponentFixture<ClientContactsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientContactsDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientContactsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
