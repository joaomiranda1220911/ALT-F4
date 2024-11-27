import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncomendasManagementComponent } from './encomendas-management.component';

describe('EncomendasManagementComponent', () => {
  let component: EncomendasManagementComponent;
  let fixture: ComponentFixture<EncomendasManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncomendasManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EncomendasManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
