import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionWomanComponent } from './collection-woman.component';

describe('CollectionWomanComponent', () => {
  let component: CollectionWomanComponent;
  let fixture: ComponentFixture<CollectionWomanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionWomanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionWomanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
