import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PratoListComponent } from './prato-list.component';

describe('PratoListComponent', () => {
  let component: PratoListComponent;
  let fixture: ComponentFixture<PratoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PratoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PratoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
