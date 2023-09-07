import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListemembreComponent } from './listemembre.component';

describe('ListemembreComponent', () => {
  let component: ListemembreComponent;
  let fixture: ComponentFixture<ListemembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListemembreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListemembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
