import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieuStockageComponent } from './lieu-stockage.component';

describe('LieuStockageComponent', () => {
  let component: LieuStockageComponent;
  let fixture: ComponentFixture<LieuStockageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LieuStockageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LieuStockageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
