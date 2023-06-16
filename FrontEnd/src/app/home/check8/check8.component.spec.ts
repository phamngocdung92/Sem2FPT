import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Check8Component } from './check8.component';

describe('Check8Component', () => {
  let component: Check8Component;
  let fixture: ComponentFixture<Check8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Check8Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Check8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
