import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionManComponent } from './collection-man.component';

describe('CollectionManComponent', () => {
  let component: CollectionManComponent;
  let fixture: ComponentFixture<CollectionManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionManComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
