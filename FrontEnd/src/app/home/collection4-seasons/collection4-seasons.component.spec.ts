import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Collection4SeasonsComponent } from './collection4-seasons.component';

describe('Collection4SeasonsComponent', () => {
  let component: Collection4SeasonsComponent;
  let fixture: ComponentFixture<Collection4SeasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Collection4SeasonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Collection4SeasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
