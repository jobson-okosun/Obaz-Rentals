import { Injectable, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PropertyListing } from '../model/interfaces';
import { LOCALE } from '../utils/config';

@Injectable({
  providedIn: 'root',
})
export class PropertyListingService {
  private _fb = new FormBuilder();
  private _availableAmenities = signal<string[]>([
    'WiFi', 
    'Air Conditioning', 
    'Swimming Pool', 
    'Pet Friendly',
    'Kitchen',
    'Dedicated workspace',
    'Free parking on premises',
    'Pool',
    'Pets allowed',
    'TV',
    'Washer',
    'Carbon monoxide alarm'
  ]);

  initializeForm(): FormGroup {
    return this._fb.nonNullable.group({

      // Basic Details
      title: ['', Validators.required],
      description: ['', Validators.required],
      propertyType: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: [''],
      postalCode: [''],

      // Pricing
      price: ['', [Validators.required, Validators.min(1)]],
      currency: [LOCALE.currencyName],
      cleaningFee: [''],
      discountWeekly: [0],
      discountMonthly: [0],

      // Property Details
      bedrooms: [''],
      bathrooms: [''],
      guestsAllowed: [''],
      squareFootage: [''],
      parkingAvailable: ['NO'],
      balcony: ['NO'],

      // Amenities
      amenities: this._fb.array(this._availableAmenities().map(() => this._fb.control(false))),
      
      // House Rules
      smokingAllowed: [false],
      petsAllowed: [false],
      eventsAllowed: [false],
      minStay: [1, [Validators.required, Validators.min(1)]],
      checkInTime: ['', Validators.required],
      checkOutTime: ['', Validators.required],

      // Photos and Media
      images: this._fb.array([ 
        this._fb.control(''), 
      ]),

      verification: this._fb.group({
        status: ['PENDING'],
        docs: this._fb.array([
          this._fb.control(''),
        ]),
      }),

    });
  }


  submitForm() {} 

  get availableAmenities(): string[] {
    return this._availableAmenities();
  }
}
