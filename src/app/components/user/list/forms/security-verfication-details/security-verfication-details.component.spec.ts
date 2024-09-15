import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityVerficationDetailsComponent } from './security-verfication-details.component';

describe('SecurityVerficationDetailsComponent', () => {
  let component: SecurityVerficationDetailsComponent;
  let fixture: ComponentFixture<SecurityVerficationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityVerficationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityVerficationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
