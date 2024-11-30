import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EmentaConsultarComponent } from './ementa-consultar.component';

describe('EmentaConsultarComponent', () => {
  let component: EmentaConsultarComponent;
  let fixture: ComponentFixture<EmentaConsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EmentaConsultarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EmentaConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
