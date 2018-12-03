import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsOfficeComponent } from './items-office.component';

describe('ItemsOfficeComponent', () => {
  let component: ItemsOfficeComponent;
  let fixture: ComponentFixture<ItemsOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
