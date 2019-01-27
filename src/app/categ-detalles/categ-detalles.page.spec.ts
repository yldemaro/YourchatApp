import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategDetallesPage } from './categ-detalles.page';

describe('CategDetallesPage', () => {
  let component: CategDetallesPage;
  let fixture: ComponentFixture<CategDetallesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategDetallesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
