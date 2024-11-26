import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateEncomendaComponent } from './encomenda-create.component';

describe('CreateEncomendaComponent', () => {
  let component: CreateEncomendaComponent;
  let fixture: ComponentFixture<CreateEncomendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEncomendaComponent],
      imports: [FormsModule, HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEncomendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form to select pratos', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeTruthy();
  });
});
