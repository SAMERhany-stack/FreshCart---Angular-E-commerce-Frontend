import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsDetailesComponent } from './brands-detailes.component';

describe('BrandsDetailesComponent', () => {
  let component: BrandsDetailesComponent;
  let fixture: ComponentFixture<BrandsDetailesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsDetailesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
