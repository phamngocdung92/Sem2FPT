import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Check5Component } from './check5.component';

describe('Check5Component', () => {
  let component: Check5Component;
  let fixture: ComponentFixture<Check5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Check5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Check5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
