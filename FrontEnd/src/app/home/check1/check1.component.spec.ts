import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Check1Component } from './check1.component';

describe('Check1Component', () => {
  let component: Check1Component;
  let fixture: ComponentFixture<Check1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Check1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Check1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
