import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BAndFComponent } from './b-and-f.component';

describe('BAndFComponent', () => {
  let component: BAndFComponent;
  let fixture: ComponentFixture<BAndFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BAndFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BAndFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
