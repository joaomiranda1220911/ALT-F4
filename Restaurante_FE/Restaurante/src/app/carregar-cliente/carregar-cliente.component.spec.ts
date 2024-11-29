import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarregarClienteComponent } from './carregar-cliente.component';

describe('CarregarClienteComponent', () => {
  let component: CarregarClienteComponent;
  let fixture: ComponentFixture<CarregarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarregarClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarregarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
