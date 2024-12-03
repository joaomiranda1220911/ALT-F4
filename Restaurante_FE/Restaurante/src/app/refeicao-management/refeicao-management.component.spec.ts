import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefeicaoManagementComponent } from './refeicao-management.component';

describe('RefeicaoManagementComponent', () => {
  let component: RefeicaoManagementComponent;
  let fixture: ComponentFixture<RefeicaoManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefeicaoManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefeicaoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
