import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefeicaoCreateComponent } from './refeicao-create.component';

describe('RefeicaoCreateComponent', () => {
  let component: RefeicaoCreateComponent;
  let fixture: ComponentFixture<RefeicaoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefeicaoCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefeicaoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
