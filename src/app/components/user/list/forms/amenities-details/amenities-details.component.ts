import { Component, computed, inject, input } from '@angular/core';
import { Form, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PropertyListingService } from '../../../../../services/property-listing.service';

@Component({
  selector: 'app-amenities-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './amenities-details.component.html',
  styleUrl: './amenities-details.component.css'
})
export class AmenitiesDetailsComponent {
  private _propertyListingService = inject(PropertyListingService);
  amentiesList = computed(() => this._propertyListingService.availableAmenities)
  form = input.required<FormGroup>()

  get amenities(): FormArray {
    return this.form().get('amenities') as FormArray;
  }
}
