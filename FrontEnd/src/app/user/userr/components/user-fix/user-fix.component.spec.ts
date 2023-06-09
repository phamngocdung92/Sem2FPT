import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFixComponent } from './user-fix.component';

describe('UserFixComponent', () => {
  let component: UserFixComponent;
  let fixture: ComponentFixture<UserFixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
