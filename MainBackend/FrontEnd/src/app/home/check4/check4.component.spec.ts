import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Check4Component } from './check4.component';

describe('Check4Component', () => {
  let component: Check4Component;
  let fixture: ComponentFixture<Check4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Check4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Check4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
