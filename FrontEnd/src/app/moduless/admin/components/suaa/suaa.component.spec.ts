import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaaComponent } from './suaa.component';

describe('SuaaComponent', () => {
  let component: SuaaComponent;
  let fixture: ComponentFixture<SuaaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuaaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
