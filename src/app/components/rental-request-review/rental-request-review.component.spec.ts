import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalRequestReviewComponent } from './rental-request-review.component';

describe('RentalRequestReviewComponent', () => {
  let component: RentalRequestReviewComponent;
  let fixture: ComponentFixture<RentalRequestReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalRequestReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalRequestReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
