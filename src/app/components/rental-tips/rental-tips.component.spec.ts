import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalTipsComponent } from './rental-tips.component';

describe('RentalTipsComponent', () => {
  let component: RentalTipsComponent;
  let fixture: ComponentFixture<RentalTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
