import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsOfficeComponent } from './transactions-office.component';

describe('TransactionsOfficeComponent', () => {
  let component: TransactionsOfficeComponent;
  let fixture: ComponentFixture<TransactionsOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
