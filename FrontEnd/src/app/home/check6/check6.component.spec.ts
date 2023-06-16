import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Check6Component } from './check6.component';

describe('Check6Component', () => {
  let component: Check6Component;
  let fixture: ComponentFixture<Check6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Check6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Check6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
