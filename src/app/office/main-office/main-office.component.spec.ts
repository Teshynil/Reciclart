import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOfficeComponent } from './main-office.component';

describe('MainOfficeComponent', () => {
  let component: MainOfficeComponent;
  let fixture: ComponentFixture<MainOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
