import { Component, computed, inject, signal } from '@angular/core';
import { PropertyListingService } from '../../../services/property-listing.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import StateService from '../../../store/state';
import { AmenitiesDetailsComponent } from './forms/amenities-details/amenities-details.component';
import { BasicDetailsComponent } from './forms/basic-details/basic-details.component';
import { HouseRulesDetailsComponent } from './forms/house-rules-details/house-rules-details.component';
import { ImagesDetailsComponent } from './forms/images-details/images-details.component';
import { PricingDetailsComponent } from './forms/pricing-details/pricing-details.component';
import { PropertyDetailsComponent } from './forms/property-details/property-details.component';
import { SecurityVerficationDetailsComponent } from './forms/security-verfication-details/security-verfication-details.component';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    AmenitiesDetailsComponent, 
    BasicDetailsComponent, 
    HouseRulesDetailsComponent, 
    ImagesDetailsComponent,
    PricingDetailsComponent,
    PropertyDetailsComponent,
    SecurityVerficationDetailsComponent,
    ReactiveFormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {
  private _propertyListingService = inject(PropertyListingService);
  private _stateSerivce = inject(StateService);

  formSteps = signal<any[]>([])
  isMobile = computed(() => this._stateSerivce.currentState().isMobile)
  propertyForm: FormGroup;

  ngOnInit(): void {
    this.onInit();
  }

  onSubmit(): void {
    if (this.propertyForm.invalid) return this.propertyForm.markAllAsTouched();
    this._propertyListingService.submitForm();
  }

  toJson(data: any): string {
    return JSON.stringify(data)
  }

  onInit() {
    const steps = [
      { title: 'Basic', step: 1 },
      { title: 'Pricing', step: 2 },
      { title: 'More Details', step: 3 },
      { title: 'Amenities', step: 4 },
      { title: 'Rules', step: 5 },
      { title: 'Photos', step: 6 },
      { title: 'Verification', step: 7 },
    ]
    this.formSteps.set(steps);
    this.propertyForm = this._propertyListingService.initializeForm();
  }
  
}
