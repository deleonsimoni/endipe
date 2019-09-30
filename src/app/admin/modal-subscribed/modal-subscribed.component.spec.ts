import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSubscribedComponent } from './modal-subscribed.component';

describe('ModalSubscribedComponent', () => {
  let component: ModalSubscribedComponent;
  let fixture: ComponentFixture<ModalSubscribedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSubscribedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSubscribedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
