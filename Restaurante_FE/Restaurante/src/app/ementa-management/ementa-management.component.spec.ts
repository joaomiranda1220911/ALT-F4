import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmentaManagementComponent } from './ementa-management.component';

describe('EmentaManagementComponent', () => {
  let component: EmentaManagementComponent;
  let fixture: ComponentFixture<EmentaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmentaManagementComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmentaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle mostrarFormularioEmenta', () => {
    expect(component.mostrarFormularioEmenta).toBeFalse();
    component.toggleFormularioEmenta();
    expect(component.mostrarFormularioEmenta).toBeTrue();
  });
});

