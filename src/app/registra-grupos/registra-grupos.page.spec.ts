import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraGruposPage } from './registra-grupos.page';

describe('RegistraGruposPage', () => {
  let component: RegistraGruposPage;
  let fixture: ComponentFixture<RegistraGruposPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistraGruposPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraGruposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
