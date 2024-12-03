import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefeicoesManagementComponent } from './refeicao-management.component';

describe('RefeicoesManagementComponent', () => {
  let component: RefeicoesManagementComponent;
  let fixture: ComponentFixture<RefeicoesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefeicoesManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefeicoesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
