import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsPersonnellesComponent } from './informations-personnelles.component';

describe('InformationsPersonnellesComponent', () => {
  let component: InformationsPersonnellesComponent;
  let fixture: ComponentFixture<InformationsPersonnellesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationsPersonnellesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationsPersonnellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
