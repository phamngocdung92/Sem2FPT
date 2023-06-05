import { ComponentFixture, TestBed } from '@angular/core/testing';

import { watchmoreComponent } from './watchmore.component';

describe('watchmoreComponent', () => {
  let component: watchmoreComponent;
  let fixture: ComponentFixture<watchmoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ watchmoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(watchmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
