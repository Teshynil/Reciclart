import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficesViewComponent } from './offices-view.component';

describe('OfficesViewComponent', () => {
  let component: OfficesViewComponent;
  let fixture: ComponentFixture<OfficesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
