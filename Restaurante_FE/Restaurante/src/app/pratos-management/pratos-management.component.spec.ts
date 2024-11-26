import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PratosManagementComponent } from './pratos-management.component';

describe('PratosManagementComponent', () => {
  let component: PratosManagementComponent;
  let fixture: ComponentFixture<PratosManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PratosManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PratosManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
