import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionManorWomanComponent } from './collection-manor-woman.component';

describe('CollectionManorWomanComponent', () => {
  let component: CollectionManorWomanComponent;
  let fixture: ComponentFixture<CollectionManorWomanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionManorWomanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionManorWomanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
