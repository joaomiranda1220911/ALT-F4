import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PratoDefinirComponent } from './prato-definir.component';

describe('PratoDefinirComponent', () => {
  let component: PratoDefinirComponent;
  let fixture: ComponentFixture<PratoDefinirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PratoDefinirComponent],
      imports: [FormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PratoDefinirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});

