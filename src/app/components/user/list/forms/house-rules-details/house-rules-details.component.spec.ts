import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRulesDetailsComponent } from './house-rules-details.component';

describe('HouseRulesDetailsComponent', () => {
  let component: HouseRulesDetailsComponent;
  let fixture: ComponentFixture<HouseRulesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseRulesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseRulesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
