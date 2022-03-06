import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMeasurementComponent } from './view-measurement.component';

describe('ViewMeasurementComponent', () => {
  let component: ViewMeasurementComponent;
  let fixture: ComponentFixture<ViewMeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMeasurementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
