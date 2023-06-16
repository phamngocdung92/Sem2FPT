import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionShoeComponent } from './collection-shoe.component';

describe('CollectionShoeComponent', () => {
  let component: CollectionShoeComponent;
  let fixture: ComponentFixture<CollectionShoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionShoeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionShoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
