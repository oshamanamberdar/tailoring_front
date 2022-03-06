import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterationComponent } from './alteration.component';

describe('AlterationComponent', () => {
  let component: AlterationComponent;
  let fixture: ComponentFixture<AlterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
