import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEncomendasComponent } from './list-encomendas.component';

describe('ListEncomendasComponent', () => {
  let component: ListEncomendasComponent;
  let fixture: ComponentFixture<ListEncomendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEncomendasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListEncomendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
