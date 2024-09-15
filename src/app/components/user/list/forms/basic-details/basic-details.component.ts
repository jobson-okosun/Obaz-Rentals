import { Component, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import DataService from '../../../../../services/data.service';
import { NgClass } from '@angular/common';
import { US_STATES } from '../../../../../utils/statics';

@Component({
  selector: 'app-basic-details',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './basic-details.component.html',
  styleUrl: './basic-details.component.css'
})
export class BasicDetailsComponent {
  private _dataService = inject(DataService)

  form = input.required<FormGroup>()
  addressSuggestions = signal<any[]>([])
  states = signal<any[]>(US_STATES)
  cities = signal<any[]>([])


  onSearchAddress(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    if (query.length < 3) {
      this.addressSuggestions.set([]);
      return;
    }

    this._dataService.searchLiveAddress(query).subscribe({
      next : (results: any) => {
        this.addressSuggestions.set(results);
      },
    });
  }

  onSelectSuggestion(suggestion: any): void {
    this.form().get('address')?.setValue(suggestion.display_name);
    this.addressSuggestions.set([]);
  }

  onStateChange(event:Event): void {
    const stateCode = (event.target as HTMLInputElement).value;
    if (stateCode) {
      this._dataService.getCitiesByState(stateCode).subscribe((response: any) => {
        this.cities.set(response.geonames.map((city: any) => city.name))
      });
    }
  }
}
