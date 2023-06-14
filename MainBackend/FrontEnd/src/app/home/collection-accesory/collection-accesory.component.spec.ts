import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionAccesoryComponent } from './collection-accesory.component';

describe('CollectionAccesoryComponent', () => {
  let component: CollectionAccesoryComponent;
  let fixture: ComponentFixture<CollectionAccesoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionAccesoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionAccesoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
