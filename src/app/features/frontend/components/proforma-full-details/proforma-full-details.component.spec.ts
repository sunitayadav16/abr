import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaFullDetailsComponent } from './proforma-full-details.component';

describe('ProformaFullDetailsComponent', () => {
  let component: ProformaFullDetailsComponent;
  let fixture: ComponentFixture<ProformaFullDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProformaFullDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformaFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
