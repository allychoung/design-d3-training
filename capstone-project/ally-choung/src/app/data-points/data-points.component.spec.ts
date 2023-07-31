import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPointsComponent } from './data-points.component';

describe('DataPointsComponent', () => {
  let component: DataPointsComponent;
  let fixture: ComponentFixture<DataPointsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataPointsComponent]
    });
    fixture = TestBed.createComponent(DataPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
