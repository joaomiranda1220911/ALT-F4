import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefeicaoRemoveComponent } from './refeicao-remove.component';

describe('RefeicaoRemoveComponent', () => {
  let component: RefeicaoRemoveComponent;
  let fixture: ComponentFixture<RefeicaoRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefeicaoRemoveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefeicaoRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
