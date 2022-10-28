import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonMimicUserComponent } from './common-mimic-user.component';

describe('CommonMimicUserComponent', () => {
  let component: CommonMimicUserComponent;
  let fixture: ComponentFixture<CommonMimicUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonMimicUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonMimicUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
