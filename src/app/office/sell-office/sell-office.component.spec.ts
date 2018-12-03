import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellOfficeComponent } from './sell-office.component';

describe('SellOfficeComponent', () => {
  let component: SellOfficeComponent;
  let fixture: ComponentFixture<SellOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
