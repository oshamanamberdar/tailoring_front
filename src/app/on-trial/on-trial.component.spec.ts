import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnTrialComponent } from './on-trial.component';

describe('OnTrialComponent', () => {
  let component: OnTrialComponent;
  let fixture: ComponentFixture<OnTrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnTrialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
