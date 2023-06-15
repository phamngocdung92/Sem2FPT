import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Check7Component } from './check7.component';

describe('Check7Component', () => {
  let component: Check7Component;
  let fixture: ComponentFixture<Check7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Check7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Check7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
