/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AvejasComponent } from './avejas.component';

describe('AvejasComponent', () => {
  let component: AvejasComponent;
  let fixture: ComponentFixture<AvejasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvejasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvejasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
