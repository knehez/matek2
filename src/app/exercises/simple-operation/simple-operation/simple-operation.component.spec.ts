import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleOperationComponent } from './simple-operation.component';

describe('SimpleOperationComponent', () => {
  let component: SimpleOperationComponent;
  let fixture: ComponentFixture<SimpleOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
