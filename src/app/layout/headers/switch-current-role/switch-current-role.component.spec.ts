import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchCurrentRoleComponent } from './switch-current-role.component';

describe('SwitchCurrentRoleComponent', () => {
  let component: SwitchCurrentRoleComponent;
  let fixture: ComponentFixture<SwitchCurrentRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchCurrentRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchCurrentRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
