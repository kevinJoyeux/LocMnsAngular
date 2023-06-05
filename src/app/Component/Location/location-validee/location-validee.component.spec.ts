import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationValideeComponent } from './location-validee.component';

describe('LocationValideeComponent', () => {
  let component: LocationValideeComponent;
  let fixture: ComponentFixture<LocationValideeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationValideeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationValideeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
