import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEnAttenteComponent } from './location-en-attente.component';

describe('LocationEnAttenteComponent', () => {
  let component: LocationEnAttenteComponent;
  let fixture: ComponentFixture<LocationEnAttenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationEnAttenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationEnAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
