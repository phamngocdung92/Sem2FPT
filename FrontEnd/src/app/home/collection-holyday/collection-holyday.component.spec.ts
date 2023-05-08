import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionHolydayComponent } from './collection-holyday.component';

describe('CollectionHolydayComponent', () => {
  let component: CollectionHolydayComponent;
  let fixture: ComponentFixture<CollectionHolydayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionHolydayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionHolydayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
