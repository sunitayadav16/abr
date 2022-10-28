import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MimicUserComponent } from './mimic-user.component';

describe('MimicUserComponent', () => {
  let component: MimicUserComponent;
  let fixture: ComponentFixture<MimicUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MimicUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MimicUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
