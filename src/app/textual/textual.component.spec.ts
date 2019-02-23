import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextualComponent } from './textual.component';

describe('TextualComponent', () => {
  let component: TextualComponent;
  let fixture: ComponentFixture<TextualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
