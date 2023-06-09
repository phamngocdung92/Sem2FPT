import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGuardsComponent } from './user-guards.component';

describe('UserGuardsComponent', () => {
  let component: UserGuardsComponent;
  let fixture: ComponentFixture<UserGuardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGuardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGuardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
