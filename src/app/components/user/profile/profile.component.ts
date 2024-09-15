import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import DataService from '../../../services/data.service';
import { US_STATES } from '../../../utils/statics';
import { NgClass } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import SelectMediaDialog from '../../shared/dialogs/select-media.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, MatDialogModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent implements OnInit {
  private _dataService = inject(DataService)
  private _fb = inject(FormBuilder)
  private _matDialog = inject(MatDialog)

  form: FormGroup
  addressSuggestions = signal<any[]>([])
  states = signal<any[]>(US_STATES)
  cities = signal<any[]>([])

  onSubmit() { }

  onSearchAddress(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    if (query.length < 3) {
      this.addressSuggestions.set([]);
      return;
    }

    this._dataService.searchLiveAddress(query).subscribe({
      next: (results: any) => {
        this.addressSuggestions.set(results);
      },
    });
  }

  onSelectSuggestion(suggestion: any): void {
    this.form.get('address')?.setValue(suggestion.display_name);
    this.addressSuggestions.set([]);
  }

  onStateChange(event: Event): void {
    const stateCode = (event.target as HTMLInputElement).value;
    if (stateCode) {
      this._dataService.getCitiesByState(stateCode).subscribe((response: any) => {
        this.cities.set(response.geonames.map((city: any) => city.name))
      });
    }
  }

  selectMedia(index: number = 0) {
    this._matDialog.open(SelectMediaDialog, { data: {}, autoFocus: false })

      .afterClosed().subscribe((res: any) => {
        try {
          if ((res.selectedFiles as any[]).length) {
            (this.form.get('verification.docs') as FormArray).controls[index]?.setValue(res.selectedFiles[0].url)
          }
        } catch (error) { }
      })
  }

  initForm() {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: [null, Validators.required],
      state: [null, Validators.required],
      city: [null, Validators.required],
      dob: [null, Validators.required],
      address: [null, Validators.required],
      payout: this._fb.group({
        bankName: [null, Validators.required],
        bankAccount: [null, Validators.required],
        channel: [null, Validators.required]
      }),
      verification: this._fb.group({
        type: ['', Validators.required],
        status: [],
        docs: this._fb.array([
          this._fb.control(''),
        ]),
      }),
    })
  }

  ngOnInit(): void {
    this.initForm()
  }

}