import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsPersonnellesDetailsComponent } from './informations-personnelles-details.component';

describe('InformationsPersonnellesDetailsComponent', () => {
  let component: InformationsPersonnellesDetailsComponent;
  let fixture: ComponentFixture<InformationsPersonnellesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationsPersonnellesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationsPersonnellesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
