import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Check2Component } from './check2.component';

describe('Check2Component', () => {
  let component: Check2Component;
  let fixture: ComponentFixture<Check2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Check2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Check2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
