import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MylistingComponent } from './mylisting.component';

describe('MylistingComponent', () => {
  let component: MylistingComponent;
  let fixture: ComponentFixture<MylistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MylistingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MylistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
