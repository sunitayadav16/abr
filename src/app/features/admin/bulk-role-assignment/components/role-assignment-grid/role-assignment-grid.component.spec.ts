import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAssignmentGridComponent } from './role-assignment-grid.component';

describe('RoleAssignmentGridComponent', () => {
  let component: RoleAssignmentGridComponent;
  let fixture: ComponentFixture<RoleAssignmentGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleAssignmentGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAssignmentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
