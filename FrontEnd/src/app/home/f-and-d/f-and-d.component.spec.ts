import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAndDComponent } from './f-and-d.component';

describe('FAndDComponent', () => {
  let component: FAndDComponent;
  let fixture: ComponentFixture<FAndDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAndDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FAndDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
