import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AVizComponent } from './a-viz.component';

describe('AVizComponent', () => {
  let component: AVizComponent;
  let fixture: ComponentFixture<AVizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AVizComponent]
    });
    fixture = TestBed.createComponent(AVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
