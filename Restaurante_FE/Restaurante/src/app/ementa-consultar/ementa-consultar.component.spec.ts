import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultarEmentaComponent } from './ementa-consultar.component';

// Define um conjunto de testes para o componente ConsultarEmentaComponent
describe('ConsultarEmentaComponent', () => {
  let component: ConsultarEmentaComponent;
  let fixture: ComponentFixture<ConsultarEmentaComponent>;

  // Executa antes de cada teste para configurar o módulo de teste e inicializar o componente
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarEmentaComponent]
    })
      .compileComponents();
    // Cria o "fixture" do componente, que é usado para acessar à sua instância e manipular o ambiente de teste
    fixture = TestBed.createComponent(ConsultarEmentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Testa se o componente é criado corretamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});