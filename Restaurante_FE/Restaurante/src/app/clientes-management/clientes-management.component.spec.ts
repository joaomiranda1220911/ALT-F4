import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesManagementComponent } from './clientes-management.component';

describe('ClientesManagementComponent', () => {
  let component: ClientesManagementComponent;
  let fixture: ComponentFixture<ClientesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});