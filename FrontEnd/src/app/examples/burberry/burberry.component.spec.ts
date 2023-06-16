import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurberryComponent } from './burberry.component';

describe('BurberryComponent', () => {
  let component: BurberryComponent;
  let fixture: ComponentFixture<BurberryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurberryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BurberryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
