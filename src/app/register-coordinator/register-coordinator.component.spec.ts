import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCoordinatorComponent } from './register-coordinator.component';

describe('RegisterCoordinatorComponent', () => {
  let component: RegisterCoordinatorComponent;
  let fixture: ComponentFixture<RegisterCoordinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCoordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
