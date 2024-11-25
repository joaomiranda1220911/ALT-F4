import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PratoCreateComponent } from './prato-create.component';

describe('PratoCreateComponent', () => {
  let component: PratoCreateComponent;
  let fixture: ComponentFixture<PratoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PratoCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PratoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
