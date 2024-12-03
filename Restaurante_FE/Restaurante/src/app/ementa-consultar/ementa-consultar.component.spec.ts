import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarEmentaComponent } from './ementa-consultar.component';

describe('ConsultarEmentaComponent', () => {
  let component: ConsultarEmentaComponent;
  let fixture: ComponentFixture<ConsultarEmentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarEmentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarEmentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});