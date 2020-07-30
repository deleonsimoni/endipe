import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEndipeVirtualComponent } from './modal-endipe-virtual.component';

describe('ModalEndipeVirtualComponent', () => {
  let component: ModalEndipeVirtualComponent;
  let fixture: ComponentFixture<ModalEndipeVirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEndipeVirtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEndipeVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
