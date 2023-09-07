import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutmembreComponent } from './ajoutmembre.component';

describe('AjoutmembreComponent', () => {
  let component: AjoutmembreComponent;
  let fixture: ComponentFixture<AjoutmembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutmembreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutmembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
