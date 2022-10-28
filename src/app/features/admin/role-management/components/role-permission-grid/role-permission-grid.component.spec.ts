import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePermissionGridComponent } from './role-permission-grid.component';

describe('RolePermissionGridComponent', () => {
  let component: RolePermissionGridComponent;
  let fixture: ComponentFixture<RolePermissionGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolePermissionGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePermissionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
