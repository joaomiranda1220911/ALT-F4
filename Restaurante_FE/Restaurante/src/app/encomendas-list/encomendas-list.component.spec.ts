import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncomendasListComponent } from './encomendas-list.component';

describe('ListEncomendasComponent', () => {
  let component: EncomendasListComponent;
  let fixture: ComponentFixture<EncomendasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncomendasListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EncomendasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
