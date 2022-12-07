import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatImageComponent } from './stat-image.component';

describe('PersonalInfoComponent', () => {
  let component: StatImageComponent;
  let fixture: ComponentFixture<StatImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
